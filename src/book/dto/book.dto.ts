import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookDto {

  @ApiProperty({
    description: 'Title of the book',
    example: 'The Great Gatsby'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Publication year of the book',
    example: 1925
  })
  @IsInt()
  publication_year: number;
}
