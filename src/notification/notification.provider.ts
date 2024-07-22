import { Notification } from "./entities/notification.entity";
import { NOTIFICATION_REPO } from "src/common/constant";

export const NotificationProviders = [
    {
        provide: NOTIFICATION_REPO,
        useValue: Notification,
    },
]