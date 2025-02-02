import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../book/entities/books.entity';
import { Loan } from '../loan/entities/loan.entity';
import { Fine } from '../fine/entities/fine.entity';
import { FineHistory } from '../fine/entities/fines_history.entity';
import { Op } from 'sequelize';
import { User } from 'src/user/entities/user.entity';
import { CreateFineDto } from './dto/reports.dto';

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
                    status: 'BORROWED',
                    return_date: null,
                },
            }),
        ]);

        return {
            total_books: totalBooks,
            borrowed_books: borrowedBooks,
            total_available_books: totalBooks - borrowedBooks,
        };
    }

    // async getAvailableBooks() {
    //     const availableBooks = await this.loanModel.findAll({
    //         where: {
    //             status: 'RETURNED',
    //         },
    //     })
    // }

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
        // 1. Find all overdue loans
        const overdueLoans = await this.loanModel.findAll({
            where: {
                status: 'BORROWED',
                due_date: {
                    [Op.lt]: new Date()  // due_date less than current date
                },
                return_date: null
            }
        });

        // 2. Create fine records for each overdue loan
        for (const loan of overdueLoans) {
            // Calculate fine amount
            const daysOverdue = Math.floor(
                (new Date().getTime() - loan.due_date.getTime()) / (1000 * 60 * 60 * 24)
            );
            const DAILY_RATE = 1; // $1 per day
            const fineAmount = daysOverdue * DAILY_RATE;

            // Create fine record
            await this.fineModel.create({
                user_id: loan.user_id,
                loan_id: loan.loan_id,
                amount: fineAmount,
                payment_status: 'PENDING',
                issue_date: new Date(),
            });
        }
    }
}
