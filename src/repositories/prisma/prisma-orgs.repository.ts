import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import type { OrgsRepository } from '../orgs-repository';

export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string) {
    const org = await prisma.oRG.findUnique({
      where: {
        email,
      },
    });

    return org;
  }

  async create(data: Prisma.ORGCreateInput) {
    const org = await prisma.oRG.create({
      data,
    });

    return org;
  }
}
