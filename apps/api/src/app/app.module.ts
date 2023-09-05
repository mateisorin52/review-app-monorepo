import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from '../auth/auth.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { HttpExceptionFilter } from '../exceptions/ExceptionFilter';
import { PrismaService } from '../prisma-service/PrismaService';
import { ReviewController } from '../review/review.controller';
import { ReviewModule } from '../review/review.module';
import { ReviewService } from '../review/review.service';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [JwtModule, AuthModule, ReviewModule],
  controllers: [AppController, UserController, AuthController, ReviewController],
  providers: [
    AppService,
    PrismaService,
    UserService,
    AuthService,
    JwtService,
    ReviewService,
    { provide: APP_PIPE, useClass: ValidationPipe },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
