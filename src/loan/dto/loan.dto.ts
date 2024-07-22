import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLoanDto {

  @ApiProperty({
    description: 'UUID of the user who has borrowed the book',
    example: 'b0fbbd99-9c0b-4ef8-bb6d-7bb9bd380a22',
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({
    description: 'UUID of the borrowed book',
    example: 'c0fbbd99-9c0b-4ef8-bb6d-8bb9bd380a33',
  })
  @IsUUID()
  book_id: string;

  @ApiProperty({
    description: 'Date when the book should be returned',
    example: '2024-07-30T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  return_date: Date;

  @ApiProperty({
    description: 'Due date for returning the book',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  due_date: Date;

  @ApiProperty({
    description: 'Date when the book was issued',
    example: '2024-07-10T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  issue_date: Date;

  @ApiProperty({
    description: 'Status of the loan (borrowed, returned, overdue)',
    example: 'borrowed',
  })
  @IsString()
  status: string;
}
