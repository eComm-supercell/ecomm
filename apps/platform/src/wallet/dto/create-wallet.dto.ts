import { IsInt } from 'class-validator';

export class CreateWalletDto {
  @IsInt()
  amount: number;
}
