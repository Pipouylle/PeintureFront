export default interface NotificationModel {
    id: number;
    message: string;
    onerror: boolean;
}

let id = 0;

function nextId(): number {
    return ++id;
}

export function createNotification(message: string, onerror: boolean): NotificationModel {
    return {id: nextId(), message, onerror};
}