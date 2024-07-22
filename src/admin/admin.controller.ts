import { Controller, Get, Put, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { Admin } from './entities/admin.entity';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/admin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get()
    async findAll(): Promise<Admin[]> {
        const admins = await this.adminService.findAll();
        return admins;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Admin> {
        const admin = await this.adminService.findOne(id);
        return admin;
    }

    @Post()
    async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
        const admin = await this.adminService.create(createAdminDto);
        return admin;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateAdminDto: CreateAdminDto): Promise<Admin> {
        const admin = await this.adminService.update(id, updateAdminDto);
        return admin;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.adminService.remove(id);
    }
}
