import { Controller, Get, Put, Post, Delete, Body, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateStaffDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    @Get('get-all-users')
    async findAll(): Promise<User[]> {
        const users = await this.userService.findAll();
        return users;
    }

    // @Get(':id')
    // async findOne(@Param('id') id: string): Promise<User> {
    //     const user = await this.userService.findOne(id);
    //     return user;
    // }

    @Post('staff-signup')
    async createStaffUser(
        @Body() createStaffDto: CreateStaffDto): Promise<User> {
        const user = await this.userService.createStaffUser(createStaffDto);
        return user;
    }

    @Patch('change-role')
    async update(@Body() updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userService.updateUserRole(updateUserDto);
        return user;
    }

    // @Delete(':id')
    // async remove(@Param('id') id: string): Promise<void> {
    //     await this.userService.remove(id);
    // }
}
