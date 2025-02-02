import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsInt, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFineDto {

  @ApiProperty({
    description: 'UUID of the user who has the fine',
    example: 'b0fbbd99-9c0b-4ef8-bb6d-7bb9bd380a22',
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({})
  @IsInt()
  loan_id: number;

  @ApiProperty({
    description: 'Amount of the fine',
    example: 50,
  })
  @IsInt()
  amount: number;

  @ApiProperty({
    description: 'Payment status of the fine',
    example: 'Pending',
  })
  @IsString()
  payment_status: string;

  @ApiProperty({
    description: 'Date when the fine was issued',
    example: '2024-07-15T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  issue_date: Date;
}
