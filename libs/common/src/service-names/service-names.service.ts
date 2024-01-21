import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServiceNamesService {
  constructor(private config: ConfigService) {}
  connectToAuthenticationService() {
    return {
      name: this.config.get('AUTHENTICATION_SERVICE_NAME'),
      port: this.config.get('AUTHENTICATION_PORT'),
      label: 'AUTHENTICATION',
    };
  }

  connectToAssetsService() {
    return {
      name: this.config.get('ASSETS_SERVICE_NAME'),
      port: this.config.get('ASSETS_PORT'),
      label: 'ASSETS',
    };
  }
}
