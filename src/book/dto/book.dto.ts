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

  @IsNotEmpty()
  @ApiProperty({
    description: 'Author of the book',
    example: 'F. Scott Fitzgerald'
  })
  @IsString()
  author: string;

  @ApiProperty({
    description: 'Publication year of the book',
    example: 1925
  })
  @IsInt()
  publication_year: number;
}
