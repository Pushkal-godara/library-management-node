import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'Rajat Kumar' })
  username: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}