import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { ShopsModule } from './shops/shops.module';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { SharedAuthModule } from '@libs/common/src/auth/sharedAuth.module';
import { CustomersAuthenticationModule } from './auth/authentication.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@libs/common/src/constants/service-names';

@Module({
  imports: [
    CustomersAuthenticationModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    CategoriesModule,
    ShopsModule,
    PrismaModule,
    SharedAuthModule,
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
      // Connect SHOPS service as a client to auth microservice
      {
        name: SERVICE_NAMES.auth.name,
        transport: Transport.TCP,
        options: {
          host: SERVICE_NAMES.auth.name,
          port: parseInt(SERVICE_NAMES.auth.port as string) as number,
        },
      },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
