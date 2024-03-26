import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: process.env.JWT_SECRET_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    // const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    // const bearer = refreshToken.split(' ')[0];
    const refreshToken = req.body['refreshToken'];
    // const refreshToken = req.headers
    //   .get('Authorization')
    //   .replace('Bearer', '')
    //   .trim();
    return { ...payload, refreshToken: refreshToken };
  }
}
