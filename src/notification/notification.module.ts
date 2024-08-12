import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Notification } from "./entities/notification.entity";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { NotificationProviders } from "./notification.provider";

@Module({
    imports: [SequelizeModule.forFeature([Notification])],
    controllers: [NotificationController],
    providers: [NotificationService, ...NotificationProviders],
    exports: [NotificationService],
})
export class NotificationModule {}