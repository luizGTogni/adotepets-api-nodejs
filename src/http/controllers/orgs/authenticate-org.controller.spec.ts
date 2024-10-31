import request from 'supertest';

import { app } from '@/app';
import { makeOrg } from 'tests/factories/make-org.factory';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Authenticate Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should authenticate a org', async () => {
    const org = makeOrg();

    await request(app.server).post('/orgs').send(org).expect(201);

    const response = await request(app.server).post('/orgs/sessions').send({
      email: org.email,
      password: org.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String))
  });
});
