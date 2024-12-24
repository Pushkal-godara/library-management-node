import { Controller, Get, Put, Post, Delete, Body, Param, Patch, Req, UseGuards, UseInterceptors} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateStaffDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { PartialUser } from './interfaces/user.interface';


@ApiTags('User')
@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    @Get('get-all-users')
    @CacheKey('all_users_list')
    @CacheTTL(3600)
    async findAll(): Promise<User[]> {
        const users = await this.userService.findAll();
        return users;
    }

    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    @Get('get-user-byId/:id')
    @CacheKey('user_by_id')
    @CacheTTL(3600)
    async findOne(@Param('id') id: string): Promise<PartialUser> {
        const user = await this.userService.findOne(id);
        return user;
    }

    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    @Post('staff/create-account')
    async createStaffUser(
        @Body() createStaffDto: CreateStaffDto): Promise<User> {
        const user = await this.userService.createStaffUser(createStaffDto);
        return user;
    }

    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
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
