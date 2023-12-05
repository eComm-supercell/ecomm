import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateWalletDto } from './create-wallet.dto';
import { IsInt } from 'class-validator';

export class UpdateWalletDto extends PickType(CreateWalletDto, [
  'amount',
] as const) {
  @ApiProperty({
    description: 'The id of the wallet',
    example: 1,
    type: 'number',
    nullable: false,
  })
  @IsInt()
  id: number;
}
