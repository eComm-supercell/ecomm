export class NotificationTokenEntity {
  id: number;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
  };
}
