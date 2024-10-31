import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import type { ORG, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import type { FindManyNearbyParams, OrgsRepository } from '../orgs-repository';

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: ORG[] = [];

  async findById(id: string): Promise<ORG | null> {
    const org = this.items.find((org) => org.id === id) || null;

    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email) || null;

    return org;
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((org) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: org.latitude.toNumber(),
          longitude: org.longitude.toNumber(),
        }
      );

      return distance < 10;
    });
  }

  async create(data: Prisma.ORGCreateInput) {
    const org = {
      id: crypto.randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    };

    this.items.push(org);

    return org;
  }
}
