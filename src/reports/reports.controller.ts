import { Controller, Get, Param, HttpException, HttpStatus, Post, Body, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateFineDto } from './dto/reports.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reports')
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

  @Get('books/available-to-borrow')
  async getBooksAvailableToBorrow(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    try {
      const { books, total } = await this.reportsService.availableBooks(page, limit);
      return {
        success: true,
        data: books,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new HttpException(
        'Failed to get available books',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/overdue-reports')
  async getOverdueReportByUserId(@Query('userId') userId: string) {
    console.log('USER ID ==>> ', userId);
    try {
      const report = await this.reportsService.getOverdueReportByUserId(userId);
      return {
        success: true,
        data: report
    };
    } catch (error) {
      throw new HttpException(
        'Failed to generate overdue report',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}