import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Book } from '../book/entities/books.entity';
import { Loan } from '../loan/entities/loan.entity';
import { Fine } from '../fine/entities/fine.entity';
import { FineHistory } from '../fine/entities/fines_history.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Book, Loan, Fine, FineHistory]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}