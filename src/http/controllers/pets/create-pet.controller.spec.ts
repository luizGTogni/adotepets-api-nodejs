import request from 'supertest';

import { app } from '@/app';
import { makeOrg } from 'tests/factories/make-org.factory';
import { makePet } from 'tests/factories/make-pet.factory';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new pet', async () => {
    const org = makeOrg();

    await request(app.server).post('/orgs').send(org).expect(201);
    const authResponse = await request(app.server).post('/orgs/sessions').send({
      email: org.email,
      password: org.password,
    });

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet());

    expect(response.status).toBe(201);
  });
});
