export class NotificationEntity {
  id: number;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
  };
}
