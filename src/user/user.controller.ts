import { Controller, Get, Put, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<User[]> {
        const users = await this.userService.findAll();
        return users;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        const user = await this.userService.findOne(id);
        return user;
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userService.create(createUserDto);
        return user;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<User> {
        const user = await this.userService.update(id, updateUserDto);
        return user;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.userService.remove(id);
    }
}
