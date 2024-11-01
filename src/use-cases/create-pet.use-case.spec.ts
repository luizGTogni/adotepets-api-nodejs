import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository';
import { makeOrg } from 'tests/factories/make-org.factory';
import { makePet } from 'tests/factories/make-pet.factory';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreatePetUseCase } from './create-pet.use-case';
import { OrgNotFoundError } from './errors/org-not-found.error';

describe('Create Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: CreatePetUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new CreatePetUseCase(orgsRepository, petsRepository);
  });

  it('Create Pet Use Case', async () => {
    const org = await orgsRepository.create(makeOrg());

    const { pet } = await sut.execute(makePet({ org_id: org.id }));

    expect(pet.id).toEqual(expect.any(String));
  });

  it('should not be able to create a new pet with a non-existing org', async () => {
    await expect(() => sut.execute(makePet())).rejects.toBeInstanceOf(
      OrgNotFoundError
    );
  });
});
