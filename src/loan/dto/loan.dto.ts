import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

// Enum for Loan Status
export enum LoanStatus {
  BORROWED = 'BORROWED',
  RETURNED = 'RETURNED',
  AVAILABLE = 'AVAILABLE',
}

export class ReturnBookDto {

  @ApiProperty()
  @IsUUID()
  user_id: string;

  @ApiProperty()
  book_id: number;
}

export class CreateLoanDto {

  @ApiProperty({
    description: 'UUID of the user who has borrowed the book',
    example: 'b0fbbd99-9c0b-4ef8-bb6d-7bb9bd380a22',
  })
  @IsUUID()
  user_id: string;

  @ApiProperty()
  book_id: number;

  // @ApiProperty({
  //   description: 'Date when the book should be returned',
  //   example: '2024-07-30',
  // })
  // @IsDate()
  // @Type(() => Date)
  // return_date: Date;

  @ApiProperty({
    description: 'Due date for returning the book',
    example: '2024-07-20',
  })
  @IsDate()
  @Type(() => Date)
  due_date: Date;

  @ApiProperty({
    description: 'Date when the book was issued',
    example: '2024-07-10',
  })
  @IsDate()
  @Type(() => Date)
  issue_date: Date;

  // @ApiProperty({
  //   description: 'Status of the loan (borrowed, returned, overdue)',
  //   example: 'borrowed',
  // })
  // @IsString()
  // status: string;
}
