import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCatalogDto {

  @ApiProperty({
    description: 'Description of the catalog',
    example: 'A collection of fiction books'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Category of the catalog, e.g., Fiction, Science, Novel, etc.',
    example: 'Fiction'
  })
  @IsNotEmpty()
  @IsString()
  category: string;
}
