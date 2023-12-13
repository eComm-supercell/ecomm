import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import AuthStrategy from '@libs/common/src/enums/auth-startegy.enum';
import { SharedAuthService } from '../sharedAuth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.LOCAL,
) {
  constructor(private readonly strategyService: SharedAuthService) {
    super({ usernameField: 'username', passwordField: 'password' });
  }

  /***
   * Validate user using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
   *
   */
  async validate(username: string, password: string): Promise<any> {
    // return await this.strategyService.validate(username, password);
  }
}
