import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFeedbackDto {

  @ApiProperty({
    description: 'UUID of the user who gives the feedback',
    example: 'b0fbbd99-9c0b-4ef8-bb6d-7bb9bd380a22',
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({
    description: 'UUID of the book for which the feedback is given',
    example: 'c0fbbd99-9c0b-4ef8-bb6d-8bb9bd380a33',
  })
  @IsUUID()
  book_id: string;

  @ApiProperty({
    description: 'Comment about the book',
    example: 'This book was very insightful and well-written.',
  })
  @IsString()
  @IsOptional()
  comment: string;

  @ApiProperty({
    description: 'Rating of the book',
    example: '5 stars',
  })
  @IsString()
  @IsNotEmpty()
  rating: string;

}
