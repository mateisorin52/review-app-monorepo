import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/PrismaService';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  getData() {
    return this.prisma.user.findMany();
  }
}
