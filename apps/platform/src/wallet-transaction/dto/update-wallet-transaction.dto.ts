import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateWalletTransactionDto } from './create-wallet-transaction.dto';

export class UpdateWalletTransactionDto extends PickType(
  CreateWalletTransactionDto,
  ['amount'] as const,
) {
  @ApiProperty({
    description: 'The id of the wallet transaction',
    example: 1,
    type: 'number',
    nullable: false,
  })
  id: number;
}
