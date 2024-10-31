import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository';
import { FetchNearbyOrgsUseCase } from '../fetch-nearby-orgs.use-case';

export function makeFetchNearbyPetsUseCase() {
  return new FetchNearbyOrgsUseCase(new PrismaOrgsRepository());
}
