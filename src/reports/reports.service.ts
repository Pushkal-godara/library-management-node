import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../book/entities/books.entity';
import { Loan } from '../loan/entities/loan.entity';
import { Fine } from '../fine/entities/fine.entity';
import { Op } from 'sequelize';
import { User } from 'src/user/entities/user.entity';
import { CreateFineDto } from './dto/reports.dto';
import { LoanStatus } from '../loan/dto/loan.dto';
import { Author } from 'src/book/entities/author.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectModel(Book)
        private bookModel: typeof Book,
        @InjectModel(Loan)
        private loanModel: typeof Loan,
    ) { }

    async getBookAvailabilityReport() {
        const [totalBooks, borrowedBooks] = await Promise.all([
            this.bookModel.count(),
            this.loanModel.count({
                where: {
                    status: LoanStatus.BORROWED,
                    return_date: null,
                },
            }),
        ]);
        return {
            total_books: totalBooks,
            total_borrowed_books: borrowedBooks,
            total_available_books: totalBooks - borrowedBooks,
        };
    }

    async availableBooks(page: number = 1, limit: number = 5) {
        try {
            const offset = (page - 1) * limit;
    
            // First, get book_ids that are RETURNED or AVAILABLE from Loan table
            const availableFromLoans = await Loan.findAll({
                where: {
                    status: {
                        [Op.in]: ['RETURNED', 'AVAILABLE']
                    }
                },
                attributes: ['book_id'],
                raw: true
            });
    
            // Get all book_ids that have ever been in loans
            const allLoanedBooks = await Loan.findAll({
                attributes: ['book_id'],
                raw: true,
                group: ['book_id']
            });
    
            const loanedBookIds = allLoanedBooks.map(loan => loan.book_id);
            const availableBookIds = availableFromLoans.map(loan => loan.book_id);
            
            // Single query with pagination for both available and never-loaned books
            const { rows: books, count: total } = await Book.findAndCountAll({
                attributes: ['book_id', 'title', 'description', 'author_id', 'image_url', 'publication_year'],
                where: {
                    [Op.or]: [
                        { book_id: { [Op.in]: availableBookIds } },
                        { book_id: { [Op.notIn]: loanedBookIds } }
                    ]
                },
                limit,
                offset,
                raw: true,
                order: [['book_id', 'ASC']]
            });
    
            return {
                books,
                total
            };
    
        } catch (error) {
            console.error('Error fetching available books: ', error);
            throw error;
        }
    }

    async getOverdueReportByUserId(userId: string) {
        try {
            // Get all loans for the user with BORROWED status
            const userLoans = await this.loanModel.findAll({
                where: {
                    user_id: userId,
                    status: LoanStatus.BORROWED
                },
                include: [{
                    model: Book,
                    attributes: ['title', 'book_id']  // Include book details
                }]
            });
    
            const currentDate = new Date();
            const overdueItems = [];
    
            // Calculate fines for overdue items
            for (const loan of userLoans) {
                const dueDate = new Date(loan.due_date);
                
                // Check if the book is overdue
                if (dueDate < currentDate) {
                    const fineAmount = this.calculateFineAmount(dueDate, currentDate);
                    
                    overdueItems.push({
                        loan_id: loan.loan_id,
                        book_id: loan.book_id,
                        book_title: loan.book?.title,
                        book_author: loan.book?.author,
                        due_date: loan.due_date,
                        days_overdue: Math.floor(
                            (currentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
                        ),
                        fine_amount: fineAmount
                    });
                }
            }
    
            // Calculate total fine
            const totalFine = overdueItems.reduce((sum, item) => sum + item.fine_amount, 0);
    
            // Return the report
            return {
                user_id: userId,
                total_overdue_items: overdueItems.length,
                total_fine: totalFine,
                overdue_items: overdueItems,
                generated_at: currentDate
            };
    
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to generate overdue report',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    calculateFineAmount(dueDate: Date, currentDate: Date): number {
        const days = Math.floor(
            (currentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        const DAILY_RATE = 1; // $1 per day
        return Math.max(0, days * DAILY_RATE);
    }

}
