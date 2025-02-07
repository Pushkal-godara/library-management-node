import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../book/entities/books.entity';
import { Loan } from '../loan/entities/loan.entity';
import { Fine } from '../fine/entities/fine.entity';
import { FineHistory } from '../fine/entities/fines_history.entity';
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
        @InjectModel(Fine)
        private fineModel: typeof Fine,
        @InjectModel(FineHistory)
        private fineHistoryModel: typeof FineHistory,
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

    async availableBooks() {
        try {
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
    
            // Get books that have never been loaned
            const neverLoanedBooks = await Book.findAll({
                attributes: ['book_id', 'title', 'description', 'author_id', 'image_url', 'publication_year'],
                where: {
                    book_id: {
                        [Op.notIn]: loanedBookIds
                    }
                },
                raw: true
            });
    
            // Get the complete books data for available and returned books
            const availableBookIds = availableFromLoans.map(loan => loan.book_id);
            const availableLoanedBooks = await Book.findAll({
                attributes: ['book_id', 'title', 'description', 'author_id', 'image_url', 'publication_year'],
                where: {
                    book_id: {
                        [Op.in]: availableBookIds
                    }
                },
                raw: true
            });
    
            // Combine both results
            const allAvailableBooks = [...availableLoanedBooks, ...neverLoanedBooks];
    
            return allAvailableBooks;
    
        } catch (error) {
            console.error('Error fetching available books:', error);
            throw error;
        }
    }

    async getStudentFineReport(studentId: string) {
        return await this.fineModel.findAll({
            where: { user_id: studentId },
            include: [
                {
                    model: Loan,
                    include: [Book],
                },
                {
                    model: FineHistory,
                },
            ],
        });
    }

    async getOverdueReport() {
        return await this.loanModel.findAll({
            where: {
                due_date: {
                    [Op.lt]: new Date(),
                },
                return_date: null,
            },
            include: [Book, User],
        });
    }

    calculateFineAmount(dueDate: Date, returnDate: Date): number {
        const days = Math.floor(
            (returnDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        const DAILY_RATE = 1; // $1 per day
        return Math.max(0, days * DAILY_RATE);
    }

    async createFinePayment(createFineDto: CreateFineDto) {
        return await this.fineHistoryModel.create({
            fine_id: createFineDto.fine_id,
            amount_paid: createFineDto.amount_paid,
            payment_method: createFineDto.payment_method,
            payment_date: new Date(),
            transaction_reference: `TXN-${Date.now()}`,
        });
    }

    async createFinesForOverdueBooks() {
        // Find all overdue loans
        const overdueLoans = await this.loanModel.findAll({
            where: {
                status: 'BORROWED',
                due_date: {
                    [Op.lt]: new Date()
                },
                return_date: null
            }
        });

        const generatedFines = [];

        // Create fine records for each overdue loan
        for (const loan of overdueLoans) {
            const daysOverdue = Math.floor(
                (new Date().getTime() - loan.due_date.getTime()) / (1000 * 60 * 60 * 24)
            );
            const DAILY_RATE = 1;
            const fineAmount = daysOverdue * DAILY_RATE;

            const fine = await this.fineModel.create({
                user_id: loan.user_id,
                loan_id: loan.loan_id,
                amount: fineAmount,
                payment_status: 'PENDING',
                issue_date: new Date(),
            });

            generatedFines.push(fine);
        }

        return {
            totalFinesGenerated: generatedFines.length,
            fines: generatedFines
        };
    }
}
