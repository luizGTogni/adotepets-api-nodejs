import type { PetsRepository } from '@/repositories/pets-repository';
import type { Pet } from '@prisma/client';

interface SearchPetsUseCaseRequest {
  city: string;
  age?: number;
  size?: string;
  energy_level?: string;
}

interface SearchPetsUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
      energy_level,
    });

    return { pets };
  }
}
