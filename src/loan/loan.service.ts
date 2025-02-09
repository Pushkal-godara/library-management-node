import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Loan } from "./entities/loan.entity";
import { User } from "src/user/entities/user.entity";
import { Book } from "../book/entities/books.entity";
import { CreateLoanDto, LoanStatus, ReturnBookDto } from "./dto/loan.dto";
// import { LOAN_REPO } from "src/common/constant";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class LoanService {
    constructor(
        @InjectModel(Loan)
        private loanModel: typeof Loan,
        @InjectModel(User)
        private userModel: typeof User,
        @InjectModel(Book)
        private bookModel: typeof Book,
    ) { }

    // Function to borrow a book
    async borrowBook(createLoanDto: CreateLoanDto) {
        try {
            // 1. Check if user exists
            const user = await this.userModel.findByPk(createLoanDto.user_id);
            if (!user) {
                throw new HttpException(
                    'User not found',
                    HttpStatus.NOT_FOUND
                );
            }
    
            // 2. Check if book exists
            const book = await this.bookModel.findByPk(createLoanDto.book_id);
            if (!book) {
                throw new HttpException(
                    'Book not found',
                    HttpStatus.NOT_FOUND
                );
            }
    
            // 3. Check if book exists in loan table
            const existingLoan = await this.loanModel.findOne({
                where: { book_id: createLoanDto.book_id }
            });
    
            if (existingLoan) {
                // Check if book is available to borrow
                if (existingLoan.status === LoanStatus.AVAILABLE || existingLoan.status === LoanStatus.RETURNED) {
                    // Update existing record
                    await existingLoan.update({
                        user_id: createLoanDto.user_id,
                        issue_date: createLoanDto.issue_date,
                        due_date: createLoanDto.due_date,
                        return_date: null,
                        status: LoanStatus.BORROWED
                    });
                    return existingLoan;
                } else {
                    throw new HttpException(
                        'Book is not available for borrowing',
                        HttpStatus.BAD_REQUEST
                    );
                }
            }
    
            // 4. If book doesn't exist in loan table, create new record
            const newLoan = await this.loanModel.create({
                user_id: createLoanDto.user_id,
                book_id: createLoanDto.book_id,
                issue_date: createLoanDto.issue_date,
                due_date: createLoanDto.due_date,
                return_date: null,
                status: LoanStatus.BORROWED
            });
    
            return newLoan;
        } catch (error) {
            // If error is already an HttpException, rethrow it
            if (error instanceof HttpException) {
                throw error;
            }
            
            throw new HttpException(
                error.message || 'Failed to borrow book',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Function to return a book
    async returnBook(returnBookDto: ReturnBookDto) {
        try {
            // Find the loan record
            const loan = await this.loanModel.findOne({
                where: {
                    book_id: returnBookDto.book_id,
                    user_id: returnBookDto.user_id,
                    status: LoanStatus.BORROWED
                }
            });

            if (!loan) {
                throw new HttpException(
                    'No active loan found for this book and user',
                    HttpStatus.NOT_FOUND
                );
            }

            // Update the loan record
            await loan.update({
                user_id: null,
                return_date: new Date(),
                status: LoanStatus.AVAILABLE
            });

            return loan;
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to return book',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}