import { Controller, Get, Put, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { Loan } from './entities/loan.entity';
import { LoanService } from './loan.service';
import { CreateLoanDto, ReturnBookDto } from './dto/loan.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Loan')
@Controller('loan')
export class LoanController {
    constructor(private readonly loanService: LoanService) {}

    @Post('borrow-book')
    async borrowBook(@Body() createLoanDto: CreateLoanDto) {
        return await this.loanService.borrowBook(createLoanDto);
    }

    @Post('return-book')
    async returnBook(@Body() returnBookDto: ReturnBookDto) {
        return await this.loanService.returnBook(returnBookDto);
    }

    // @Get()
    // async findAll(): Promise<Loan[]> {
    //     const loans = await this.loanService.findAll();
    //     return loans;
    // }

    // @Get(':id')
    // async findOne(@Param('id') id: string): Promise<Loan> {
    //     const loan = await this.loanService.findOne(id);
    //     return loan;
    // }

    // @Post()
    // async create(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
    //     const loan = await this.loanService.create(createLoanDto);
    //     return loan;
    // }

    // @Patch(':id')
    // async update(@Param('id') id: string, @Body() updateLoanDto: CreateLoanDto): Promise<Loan> {
    //     const loan = await this.loanService.update(id, updateLoanDto);
    //     return loan;
    // }

    // @Delete(':id')
    // async remove(@Param('id') id: string): Promise<void> {
    //     await this.loanService.remove(id);
    // }
}
