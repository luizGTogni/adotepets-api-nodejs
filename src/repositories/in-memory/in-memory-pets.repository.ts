import type { Pet, Prisma } from '@prisma/client';
import type { FindAllParams, PetsRepository } from '../pets-repository';
import type { InMemoryOrgsRepository } from './in-memory-orgs.repository';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id) || null;

    return pet;
  }

  async findAll(params: FindAllParams) {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city
    );

    const pets = this.items
      .filter((pet) => orgsByCity.some((org) => org.id === pet.org_id))
      .filter((pet) => (params.age ? pet.age === params.age : true))
      .filter((pet) => (params.size ? pet.size === params.size : true))
      .filter((pet) =>
        params.energy_level ? pet.energy_level === params.energy_level : true
      );

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: crypto.randomUUID(),
      ...data,
    };

    this.items.push(pet);

    return pet;
  }
}
