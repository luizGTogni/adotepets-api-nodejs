import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository';
import { hash } from 'bcryptjs';
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
    const email = 'contato.test@gmail.com';
    const password = '123456';

    await orgsRepository.create({
      author_name: 'Name Test',
      cep: '13458-852',
      city: 'Rio de Janeiro',
      email,
      latitude: -21.5852,
      longitude: -21.5852,
      name: 'Pets Amigos',
      neighborhood: 'Freira',
      password: await hash(password, 6),
      state: 'Rio de Janeiro',
      street: 'Rua Marley e Eu',
      whatsapp: '19999100599',
    });

    const { org } = await sut.execute({
      email,
      password,
    });

    expect(org.id).toEqual(expect.any(String));
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
    const email = 'contato.test@gmail.com';

    await orgsRepository.create({
      author_name: 'Name Test',
      cep: '13458-852',
      city: 'Rio de Janeiro',
      email,
      latitude: -21.5852,
      longitude: -21.5852,
      name: 'Pets Amigos',
      neighborhood: 'Freira',
      password: await hash('password_error', 6),
      state: 'Rio de Janeiro',
      street: 'Rua Marley e Eu',
      whatsapp: '19999100599',
    });

    await expect(() =>
      sut.execute({
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
