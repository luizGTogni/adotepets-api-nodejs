import { Prisma, type ORG } from '@prisma/client';

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface OrgsRepository {
  findById(id: string): Promise<ORG | null>;
  findByEmail(email: string): Promise<ORG | null>;
  findManyNearby(params: FindManyNearbyParams): Promise<ORG[]>;
  create(data: Prisma.ORGCreateInput): Promise<ORG>;
}
