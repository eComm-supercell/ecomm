import Role from '../../enums/role.enum';

export class UserLogin {
  token: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  emailVerifiedAt: Date | null;
  email: string | null;
  username: string | null;
  lname: string | null;
  fname: string | null;
  provider: string | null;
  providerId: string | null;
  rewardPoints: number | null;
  role: Role | null;
  shopId: number | null;
  deliveryBoyId: number | null;
  walletId: number;
}

export class UserEntity extends UserLogin {
  role: Role;
}
