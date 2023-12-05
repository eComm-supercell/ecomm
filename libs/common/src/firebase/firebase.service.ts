import { Inject, Injectable } from '@nestjs/common';
import { CreateRequest } from 'firebase-admin/auth';
import * as admin from 'firebase-admin';
import { AppCustomException } from '../exceptions/custom-exception';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}
  async createUser(body: CreateRequest) {
    try {
      await this.firebaseAdmin.auth().createUser(body);
    } catch (error) {
      console.log(error);
      throw new AppCustomException('createFirebaseUserFailed');
    }
  }
  async getUserByUID(uid: string): Promise<admin.auth.UserRecord | null> {
    try {
      const user = await this.firebaseAdmin.auth().getUser(uid);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.firebaseAdmin.auth().getUserByEmail(email);
      return user;
    } catch (error) {
      console.log(error);
      throw new AppCustomException('userNotFound');
    }
  }

  async getUserByPhoneNumber(phoneNumber: string) {
    try {
      const user = await this.firebaseAdmin
        .auth()
        .getUserByPhoneNumber(phoneNumber);
      return user;
    } catch (error) {
      console.log(error);
      throw new AppCustomException('userNotFound');
    }
  }
}
