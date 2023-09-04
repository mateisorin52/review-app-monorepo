import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { local_jwt_secret } from 'local.configs/env.local.config';
import { Strategy, ExtractJwt } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || local_jwt_secret,
      expiresIn: '12h',
    });
  }

  async validate(payload: { id: string; name: string; email: string }) {
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };
  }
}
