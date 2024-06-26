import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async findById(id: string): Promise<Notification | null> {
    return (
      this.items.find((notification) => notification.id.toString() === id) ||
      null
    )
  }

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )
    this.items[notificationIndex] = notification
  }
}
