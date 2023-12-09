import { Module } from '@nestjs/common';
import path from 'path';
import { ConfigModule } from '@nestjs/config';
// import { AttachmentsModule } from './attachments/attachments.module';
// import { WalletModule } from './wallet/wallet.module';
// import { WalletTransactionModule } from './wallet-transaction/wallet-transaction.module';
// import { ProfileModule } from './profile/profile.module';
// import { MilisearchModule } from './milisearch/milisearch.module';
// import { ProductsModule } from './products/products.module';
// import { ShopsModule } from './shops/shops.module';
// import { AddressModule } from './address/address.module';
// import { DeliveryBoysModule } from './delivery-boys/delivery-boys.module';
// import { TagsModule } from './tags/tags.module';
// import { NotificationsModule } from './notifications/notifications.module';
// import { NotificationTokenModule } from './notification-token/notification-token.module';
import { PlatformAuthenticationModule } from './auth/authentication.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@libs/common/src/constants/service-names';
// import { SharedAuthModule } from '@libs/common/src/auth/sharedAuth.module';
// import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        process.env.NODE_ENV === 'development'
          ? path.join(process.cwd(), '.env.dev')
          : path.join(process.cwd(), '.env.prod'),
      ],
    }),
    ClientsModule.register([
      // Connect platform public service as a client to auth microservice
      {
        name: SERVICE_NAMES.auth.name,
        transport: Transport.TCP,
        options: {
          host: SERVICE_NAMES.auth.name,
          port: parseInt(SERVICE_NAMES.auth.port as string) as number,
        },
      },
    ]),
    PlatformAuthenticationModule,
    // AttachmentsModule,
    // WalletModule,
    // WalletTransactionModule,
    // ProfileModule,
    // MilisearchModule,
    // ShopsModule,
    // ProductsModule,
    // AddressModule,
    // DeliveryBoysModule,
    // TagsModule,
    // NotificationsModule,
    // NotificationTokenModule,
    // SharedAuthModule,
    // UsersModule,
  ],
})
export class AppModule {}
