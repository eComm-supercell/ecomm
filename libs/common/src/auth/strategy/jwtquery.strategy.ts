import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { exclude } from '@libs/common/src/utils/exclude';

@Injectable()
export class JwtQueryStrategy extends PassportStrategy(Strategy, 'jwtquery') {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: { username: string; sub: number }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    if (!user) {
      throw new ForbiddenException('Token is invalid');
    }
    return exclude(user, ['password']);
  }
}
