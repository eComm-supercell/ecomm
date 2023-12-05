import { AuthGuard } from '@nestjs/passport';
export class JwtqueryGuard extends AuthGuard('jwtquery') {
  constructor() {
    super();
  }
}
