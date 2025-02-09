import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Loan } from "./entities/loan.entity";
import { LoanController } from "./loan.controller";
import { LoanService } from "./loan.service";
import { LoanProviders } from "./loan.provider";
import { Book } from "src/book/entities/books.entity";
import { User } from "src/user/entities/user.entity";


@Module({
    imports: [SequelizeModule.forFeature([Loan, User, Book])], 
    controllers: [LoanController],
    providers: [LoanService, ...LoanProviders],
    exports: [LoanService],
})
export class LoanModule {}