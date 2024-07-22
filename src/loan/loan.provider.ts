import { Loan } from "./entities/loan.entity";
import { LOAN_REPO } from "src/common/constant";

export const LoanProviders = [
    {
        provide: LOAN_REPO,
        useValue: Loan,
    },
]