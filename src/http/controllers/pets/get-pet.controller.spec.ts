import request from 'supertest';

import { app } from '@/app';
import { makeOrg } from 'tests/factories/make-org.factory';
import { makePet } from 'tests/factories/make-pet.factory';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Get Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get a pet', async () => {
    const org = makeOrg();

    await request(app.server).post('/orgs').send(org).expect(201);
    const authResponse = await request(app.server)
      .post('/orgs/sessions')
      .send({
        email: org.email,
        password: org.password,
      })
      .expect(200);

    const createPetResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet());

    const response = await request(app.server).get(
      `/pets/${createPetResponse.body.pet.id}`
    );

    expect(response.status).toBe(200);
  });
});
