import {
    IsString,
    IsNumber,
    IsOptional,
    IsEmail,
    IsUUID
} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({
        type: String,
        description: "User name",
        example: "John Doe"
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: "User email address",
        required: false,
        example: "john.doe@example.com"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        description: "User password",
        example: "password123"
    })
    @IsString()
    password: string;

    @ApiProperty({
        type: String,
        description: "User contact information",
        example: "123-456-7890"
    })
    @IsString()
    contact_info: string;

    @ApiProperty({
        type: Number,
        description: "Admin/Librarian/student",
        example: '1/2/3'
    })
    role_id: number;
}


export class CreateStaffDto {

    @ApiProperty()
    @IsUUID()
    admin_id: string;
  
    @ApiProperty({ example: 'Rajat Kumar' })
    name: string;
  
    @ApiProperty({ example: 'password123' })
    password: string;
  
    @ApiProperty()
    @IsEmail()
    email: string;
  
    @ApiProperty({ example: '+91 9876543210' })
    contact_info?: string;

    @ApiProperty({ example: '1' })
    role_id: number;
}


export class UpdateUserDto {
    @ApiProperty()
    @IsUUID()
    admin_id: string;

    @ApiProperty()
    @IsUUID()
    user_id: string;

    @ApiProperty()
    role_id: number;
}