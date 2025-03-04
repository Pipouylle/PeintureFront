import NotificationModel, {createNotification} from "@/models/common/NotificationModel";
import {useNotificationStore} from "@/stores";

export default class NotificationHandler {
    static showNewNotification(message: string): void;
    static showNewNotification(message: string, onerror: boolean): void;
    static showNewNotification(message: string, onerror: boolean, timeout: number): void;
    static showNewNotification(message: string, onerror: boolean = false, timeout: number = 2500): void {
        const notificationStore = useNotificationStore();
        const notification = createNotification(message, onerror);
        setTimeout(() => {
            notificationStore.notifications = notificationStore.notifications.filter(n => n.id !== notification.id);
        }, timeout);
        notificationStore.notifications.push(notification);
    }
}