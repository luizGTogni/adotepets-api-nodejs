import type { ORG, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import type { OrgsRepository } from '../orgs-repository';

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: ORG[] = [];

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email) || null;

    return org;
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
