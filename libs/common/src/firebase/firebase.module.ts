import { Global, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import firebaseServiceAcc from '../../../../firebase-service-account.json';
import { FirebaseService } from './firebase.service';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN', // Custom provider token
      useFactory: () => {
        if (admin.apps.length === 0) {
          const serviceAccount = firebaseServiceAcc as any;
          initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: serviceAccount.project_id,
            // Other configuration options
          });
        }
        return admin;
      },
    },
    FirebaseService,
  ],
  exports: ['FIREBASE_ADMIN', FirebaseService],
})
export class FirebaseModule {}
