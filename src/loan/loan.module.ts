import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Loan } from "./entities/loan.entity";
import { LoanController } from "./loan.controller";
import { LoanService } from "./loan.service";
import { LoanProviders } from "./loan.provider";


@Module({
    imports: [SequelizeModule.forFeature([Loan])], 
    controllers: [LoanController],
    providers: [LoanService, ...LoanProviders]
})
export class LoanModule {}