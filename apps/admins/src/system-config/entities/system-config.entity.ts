export class SystemConfigEntity {
  id: number;
  startHour: string;
  endHour: string;
  pricePerKm: number;
  minOrderAmount: number;
  forceClose: boolean;
  allowGuestCheckout: boolean;
  forceCloseMessage: string;
}
