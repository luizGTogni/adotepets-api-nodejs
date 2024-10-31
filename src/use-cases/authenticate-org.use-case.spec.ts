import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository';
import { hash } from 'bcryptjs';
import { makeOrg } from 'tests/factories/make-org.factory';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateOrgUseCase } from './authenticate-org.use-case';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';

describe('Authenticate Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: AuthenticateOrgUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgUseCase(orgsRepository);
  });

  it('should be able to authenticate', async () => {
    const password = '123456';

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 6) })
    );

    const { org: authenticatedOrg } = await sut.execute({
      email: org.email,
      password,
    });

    expect(authenticatedOrg.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'contato.test@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const password = '123456';

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 6) })
    );

    await expect(() =>
      sut.execute({
        email: org.email,
        password: '123485',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
