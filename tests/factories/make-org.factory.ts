import { faker } from '@faker-js/faker';
import crypto from 'node:crypto';

type Overwrite = {
  latitude?: number;
  longitude?: number;
  password?: string;
};

export function makeOrg(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    author_name: faker.person.fullName(),
    cep: faker.location.zipCode(),
    city: faker.location.city(),
    email: faker.internet.email(),
    latitude: overwrite?.latitude ?? faker.location.latitude(),
    longitude: overwrite?.longitude ?? faker.location.longitude(),
    name: faker.company.name(),
    neighborhood: faker.location.streetAddress(),
    password: overwrite?.password ?? faker.internet.password(),
    state: faker.location.state(),
    street: faker.location.street(),
    whatsapp: faker.phone.number(),
  };
}