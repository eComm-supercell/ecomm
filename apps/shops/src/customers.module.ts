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
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
