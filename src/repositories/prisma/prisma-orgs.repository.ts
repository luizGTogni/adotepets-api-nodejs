import { prisma } from '@/lib/prisma';
import type { ORG, Prisma } from '@prisma/client';
import type { FindManyNearbyParams, OrgsRepository } from '../orgs-repository';

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string): Promise<ORG | null> {
    const org = await prisma.oRG.findUnique({
      where: {
        id,
      },
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.oRG.findUnique({
      where: {
        email,
      },
    });

    return org;
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const orgs = await prisma.$queryRaw<ORG[]>`
    SELECT * from orgs
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
  `;

    return orgs;
  }

  async create(data: Prisma.ORGCreateInput) {
    const org = await prisma.oRG.create({
      data,
    });

    return org;
  }
}
