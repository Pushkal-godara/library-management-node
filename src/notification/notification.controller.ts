import { Controller, Get, Put, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { Notification } from "./entities/notification.entity";
import { CreateNotificationDto } from "./dto/notification.dto";
import { NotificationService } from './notification.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Get()
    async findAll(): Promise<Notification[]> {
        const notification = await this.notificationService.findAll();
        return notification;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Notification> {
        const notification = await this.notificationService.findOne(id);
        return notification;
    }

    @Post()
    async create(@Body() createNotificationDto: CreateNotificationDto): Promise<Notification> {
        const notification = await this.notificationService.create(createNotificationDto);
        return notification;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateNotificationDto: CreateNotificationDto): Promise<Notification> {
        const notification = await this.notificationService.update(id, updateNotificationDto);
        return notification;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.notificationService.remove(id);
    }
}
