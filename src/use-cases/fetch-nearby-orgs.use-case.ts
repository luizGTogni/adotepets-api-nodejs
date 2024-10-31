import type { OrgsRepository } from '@/repositories/orgs-repository';
import type { ORG } from '@prisma/client';
import { OrgNotFoundError } from './errors/org-not-found.error';

interface FetchNearbyOrgsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyOrgsUseCaseResponse {
  orgs: ORG[];
}

export class FetchNearbyOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyOrgsUseCaseRequest): Promise<FetchNearbyOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    if (!orgs) {
      throw new OrgNotFoundError();
    }

    return { orgs };
  }
}
