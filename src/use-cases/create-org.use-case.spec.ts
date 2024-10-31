import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository';
import { compare } from 'bcryptjs';
import { makeOrg } from 'tests/factories/make-org.factory';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateOrgUseCase } from './create-org.use-case';
import { OrgAlreadyExistsError } from './errors/org-already-exists.error';

describe('Create Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: CreateOrgUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  it('Create Org Use Case', async () => {
    const { org } = await sut.execute(makeOrg());

    expect(org.id).toEqual(expect.any(String));
  });

  it('should not be able to create a new org with an already used email', async () => {
    const org = makeOrg();

    await orgsRepository.create(org);

    await expect(() => sut.execute(org)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError
    );
  });

  it('should hash password upon creation', async () => {
    const password = '123456';

    const { org } = await sut.execute(makeOrg({ password }));

    const isPasswordCorrectlyHashed = await compare(password, org.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
