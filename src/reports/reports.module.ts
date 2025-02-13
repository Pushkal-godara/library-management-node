import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Book } from '../book/entities/books.entity';
import { Loan } from '../loan/entities/loan.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Book, Loan]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}