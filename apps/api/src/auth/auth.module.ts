import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/JwtStrategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma-service/PrismaService';
import { local_jwt_secret } from 'local.configs/env.local.config';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET || local_jwt_secret, signOptions: { expiresIn: '12h' } }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
