export class AuditLogEntity {
  id: number;
  action: string;
  entity: string;
  entityId: number;
  query: string;
  userId: number;
  createdAt: Date;
}
