import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository';
import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateOrgUseCase } from './create-org.use-case';
import { OrgsAlreadyExistsError } from './errors/orgs-already-exists.error';

describe('Create Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: CreateOrgUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  it('Create Org Use Case', async () => {
    const { org } = await sut.execute({
      author_name: 'Name Test',
      cep: '13458-852',
      city: 'Rio de Janeiro',
      email: 'contato.test@gmail.com',
      latitude: -21.5852,
      longitude: -21.5852,
      name: 'Pets Amigos',
      neighborhood: 'Freira',
      password: '132456',
      state: 'Rio de Janeiro',
      street: 'Rua Marley e Eu',
      whatsapp: '19999100599',
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it('should not be able to create a new org with an already used email', async () => {
    const email = 'contato.test@gmail.com';

    await sut.execute({
      author_name: 'Name Test',
      cep: '13458-852',
      city: 'Rio de Janeiro',
      email,
      latitude: -21.5852,
      longitude: -21.5852,
      name: 'Pets Amigos',
      neighborhood: 'Freira',
      password: '132456',
      state: 'Rio de Janeiro',
      street: 'Rua Marley e Eu',
      whatsapp: '19999100599',
    });

    await expect(() =>
      sut.execute({
        author_name: 'Name Test',
        cep: '13458-852',
        city: 'Rio de Janeiro',
        email,
        latitude: -21.5852,
        longitude: -21.5852,
        name: 'Pets Amigos',
        neighborhood: 'Freira',
        password: '132456',
        state: 'Rio de Janeiro',
        street: 'Rua Marley e Eu',
        whatsapp: '19999100599',
      })
    ).rejects.toBeInstanceOf(OrgsAlreadyExistsError);
  });

  it('should hash password upon creation', async () => {
    const { org } = await sut.execute({
      author_name: 'Name Test',
      cep: '13458-852',
      city: 'Rio de Janeiro',
      email: 'contato.test@gmail.com',
      latitude: -21.5852,
      longitude: -21.5852,
      name: 'Pets Amigos',
      neighborhood: 'Freira',
      password: '132456',
      state: 'Rio de Janeiro',
      street: 'Rua Marley e Eu',
      whatsapp: '19999100599',
    });

    const isPasswordCorrectlyHashed = await compare('132456', org.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
