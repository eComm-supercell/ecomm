import { Module } from '@nestjs/common';
import { SeedModule } from './scripts/seed/seed.module';
import { CommonService } from './common.service';
import { FirebaseModule } from './firebase/firebase.module';
import { PrismaModule } from './prisma/prisma.module';
import { SharedAuthModule } from './auth/sharedAuth.module';
import { AbilityModule } from './ability/ability.module';
import { ServiceNamesModule } from './service-names/service-names.module';
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [
    SeedModule,
    FirebaseModule,
    PrismaModule,
    SharedAuthModule,
    AbilityModule,
    ServiceNamesModule,
    MinioModule,
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
