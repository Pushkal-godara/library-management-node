import {
    IsString,
    IsNumber,
    IsOptional,
    IsEmail,
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
