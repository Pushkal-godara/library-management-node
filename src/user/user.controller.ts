import { Controller, Get, Put, Post, Delete, Body, Param, Patch, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateStaffDto } from './dto/user.dto';
import { request } from 'http';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<User[]> {
        const users = await this.userService.findAll();
        return users;
    }

    // @Get(':id')
    // async findOne(@Param('id') id: string): Promise<User> {
    //     const user = await this.userService.findOne(id);
    //     return user;
    // }

    @Post('staff')
    async createStaffUser(
        @Body() createStaffDto: CreateStaffDto
    ): Promise<User> {
        const user = await this.userService.createStaffUser( createStaffDto);
        return user;
    }

    // @Patch(':id')
    // async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<User> {
    //     const user = await this.userService.update(id, updateUserDto);
    //     return user;
    // }

    // @Delete(':id')
    // async remove(@Param('id') id: string): Promise<void> {
    //     await this.userService.remove(id);
    // }
}
