import request from 'supertest';

import { app } from '@/app';
import { makeOrg } from 'tests/factories/make-org.factory';
import { makePet } from 'tests/factories/make-pet.factory';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Search Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to search pets by city', async () => {
    const org = makeOrg();

    await request(app.server).post('/orgs').send(org);

    const authResponse = await request(app.server)
      .post('/orgs/sessions')
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet());

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet());

    const response = await request(app.server)
      .get('/pets')
      .query({ city: org.city });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(2);
  });

  it('should not be able to search pets without city', async () => {
    const response = await request(app.server).get('/pets');

    expect(response.status).toBe(400);
  });

  it('should be able to search pets by city and age', async () => {
    const org = makeOrg();

    await request(app.server).post('/orgs').send(org);

    const authResponse = await request(app.server)
      .post('/orgs/sessions')
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ age: 1 }));

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ age: 2 }));

    const response = await request(app.server)
      .get('/pets')
      .query({ city: org.city, age: 1 });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it('should be able to search pets by city and size', async () => {
    const org = makeOrg();

    await request(app.server).post('/orgs').send(org);

    const authResponse = await request(app.server)
      .post('/orgs/sessions')
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'small' }));

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'medium' }));

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'small' }));

    const response = await request(app.server)
      .get('/pets')
      .query({ city: org.city, size: 'small' });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(2);
  });

  it('should be able to search pets by city and energy level', async () => {
    const org = makeOrg();

    await request(app.server).post('/orgs').send(org);

    const authResponse = await request(app.server)
      .post('/orgs/sessions')
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ energy_level: 'low' }));

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ energy_level: 'medium' }));

    const response = await request(app.server)
      .get('/pets')
      .query({ city: org.city, energy_level: 'low' });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it('should be able to search pets by city and all filters', async () => {
    const org = makeOrg();

    await request(app.server).post('/orgs').send(org);

    const authResponse = await request(app.server)
      .post('/orgs/sessions')
      .send({ email: org.email, password: org.password });

    const pets = [
      makePet({
        age: 1,
        size: 'small',
        energy_level: 'low',
      }),
      makePet({
        age: 2,
        size: 'medium',
        energy_level: 'medium',
      }),
      makePet({
        age: 1,
        size: 'large',
        energy_level: 'high',
      }),
      makePet({
        age: 1,
        size: 'small',
        energy_level: 'low',
      }),
      makePet({
        age: 5,
        size: 'medium',
        energy_level: 'medium',
      }),
    ];

    await Promise.all(
      pets.map((pet) =>
        request(app.server)
          .post('/pets')
          .set('Authorization', `Bearer ${authResponse.body.token}`)
          .send(pet)
      )
    );

    let response = await request(app.server).get('/pets').query({
      city: org.city,
      age: 1,
      size: 'small',
      energy_level: 'low',
    });

    expect(response.body.pets).toHaveLength(2);

    response = await request(app.server).get('/pets').query({
      city: org.city,
      size: 'medium',
    });

    expect(response.body.pets).toHaveLength(2);

    response = await request(app.server).get('/pets').query({
      city: org.city,
      energy_level: 'low',
    });

    expect(response.body.pets).toHaveLength(2);
  });
});
