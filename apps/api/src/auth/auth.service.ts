import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/PrismaService';
import { LoginDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt';
import { local_jwt_secret } from 'local.configs/env.local.config';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(credentials: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email: credentials.name }, { name: credentials.name }] },
    });
    if (!user) return { status: 'fail', message: 'User does not exist.' };
    if (user.password !== credentials.password) return { status: 'fail', message: 'Password is not correct.' };
    // Yes, this should be a hash check ☝🏻
    return this.login(user);
  }

  login(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };
    const resp = {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || local_jwt_secret,
        expiresIn: '12h',
      }),
    };
    return resp;
  }
}
