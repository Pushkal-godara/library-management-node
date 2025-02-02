import { Controller, Get, Param, HttpException, HttpStatus, Post, Body } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateFineDto } from './dto/reports.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('books/availability')
  async getBookAvailability() {
    try {
      const books = await this.reportsService.getBookAvailabilityReport();
      return {
        success: true,
        data: books
    };
    } catch (error) {
      throw new HttpException(
        'Failed to generate availability report',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('students/:studentId/fines')
  async getStudentFines(@Param('studentId') studentId: string) {
    try {
      const studentFines = await this.reportsService.getStudentFineReport(studentId);
      return {
        success: true,
        data: studentFines
    };
    } catch (error) {
      throw new HttpException(
        'Failed to generate student fine report',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('books/overdue')
  async getOverdueBooks() {
    try {
      const books = await this.reportsService.getOverdueReport();
      return {
        success: true,
        data: books
    };
    } catch (error) {
      throw new HttpException(
        'Failed to generate overdue report',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('generate-fine/byFineId')
  async generateFineByFineId(@Body() generateFineDto: CreateFineDto) {
    try {
      const fine = await this.reportsService.createFinePayment(generateFineDto);
      return {
        success: true,
        data: fine
    };
    } catch (error) {
      throw new HttpException(
        'Failed to generate fine',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}