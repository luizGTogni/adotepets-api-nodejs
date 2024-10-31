import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository';
import { GetPetUseCase } from '@/use-cases/get-pet.use-case';
import { makePet } from 'tests/factories/make-pet.factory';
import { beforeEach, describe, expect, it } from 'vitest';
import { PetNotFoundError } from './errors/pet-not-found.error';

describe('Get Pet Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: GetPetUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new GetPetUseCase(petsRepository);
  });

  it('should be able to get a new pet', async () => {
    const pet = await petsRepository.create(makePet());
    const result = await sut.execute({ id: pet.id });

    expect(result.pet).toEqual(pet);
  });

  it('should not be able to get a non-existing pet', async () => {
    await expect(sut.execute({ id: 'invalid' })).rejects.toBeInstanceOf(
      PetNotFoundError
    );
  });
});
