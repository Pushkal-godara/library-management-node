import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class SignupDto {

  @ApiProperty()
  @IsUUID()
  user_id: string;

  @ApiProperty({ example: 'Rajat Kumar' })
  name: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+91 9876543210' })
  contact_info?: string;
}


export class LoginDto {

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;

}


export class GetRoleDto {

  @ApiProperty()
  role_id: number;
  
}