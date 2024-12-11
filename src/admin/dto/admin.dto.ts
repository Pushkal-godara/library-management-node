import {
    IsString,
    IsNumber,
    IsOptional,
    IsEmail,
} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';

export class CreateAdminDto extends User {}