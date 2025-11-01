import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async getHello() {
    const users = await prisma.user.findMany();
    return { message: 'Hello from Nest + Prisma + Postgres!', users };
  }
}
