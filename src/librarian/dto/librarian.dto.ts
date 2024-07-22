import {
    IsString,
    IsNumber,
    IsOptional,
    IsEmail,
} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from 'src/user/dto/user.dto';

export class CreateLibrarianDto extends CreateUserDto {}