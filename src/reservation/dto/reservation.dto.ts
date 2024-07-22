import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {

  @ApiProperty({
    description: 'UUID of the user making the reservation',
    example: 'b0fbbd99-9c0b-4ef8-bb6d-7bb9bd380a22',
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({
    description: 'UUID of the reserved book',
    example: 'c0fbbd99-9c0b-4ef8-bb6d-8bb9bd380a33',
  })
  @IsUUID()
  book_id: string;

  @ApiProperty({
    description: 'Date when the reservation was made',
    example: '2024-07-15T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  reservation_date: Date;

  @ApiProperty({
    description: 'Status of the reservation (active, cancelled, or fulfilled)',
    example: 'active',
  })
  @IsString()
  status: string;
}
