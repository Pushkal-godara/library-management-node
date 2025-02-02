import { Inject, Injectable } from "@nestjs/common";
import { Loan } from "./entities/loan.entity";
import { CreateLoanDto } from "./dto/loan.dto";
import { LOAN_REPO } from "src/common/constant";

@Injectable()
export class LoanService {
    constructor(
        @Inject(LOAN_REPO)
        private loanRepo: typeof Loan,
    ) {}

    async findAll(): Promise<Loan[]> {
        const loans = await this.loanRepo.findAll();
        return loans;
    }

    async findOne(id: string): Promise<Loan> {
        const loan = await this.loanRepo.findOne({ where: { loan_id: id } });
        return loan;
    }

    // async create(createLoanDto: CreateLoanDto): Promise<Loan> {
    //     const loan = await this.loanRepo.create(createLoanDto);
    //     return loan;
    // }

    // async update(id: string, updateLoanDto: CreateLoanDto): Promise<Loan> {
    //     await this.loanRepo.update(updateLoanDto, {
    //         where: { loan_id: id },
    //     });
    //     const updatedLoan = await this.loanRepo.findOne({ where: { loan_id: id } });
    //     return updatedLoan;
    // }

    async remove(id: string): Promise<void> {
        await this.loanRepo.destroy({ where: { loan_id: id } });
    }
}