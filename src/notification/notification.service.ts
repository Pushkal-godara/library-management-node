import { Inject, Injectable } from "@nestjs/common";
import { Notification } from "./entities/notification.entity";
import { CreateNotificationDto } from "./dto/notification.dto";
import { NOTIFICATION_REPO } from "src/common/constant";

@Injectable()
export class NotificationService {
    constructor(
        @Inject(NOTIFICATION_REPO)
        private notificationsRepo: typeof Notification,
    ) {}

    async findAll(): Promise<Notification[]> {
        const notifications = await this.notificationsRepo.findAll();
        return notifications;
    }

    async findOne(id: string): Promise<Notification> {
        const notification = await this.notificationsRepo.findOne({ where: { notification_id: id } });
        return notification;
    }

    async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        const notification = await this.notificationsRepo.create(createNotificationDto);
        return notification;
    }

    async update(id: string, updatenotificationDto: CreateNotificationDto): Promise<Notification> {
        await this.notificationsRepo.update(updatenotificationDto, {
            where: { notification_id: id },
        });
        const updatedNotification = await this.notificationsRepo.findOne({ where: { notification_id: id } });
        return updatedNotification;
    }

    async remove(id: string): Promise<void> {
        await this.notificationsRepo.destroy({ where: { notification_id: id } });
    }
}