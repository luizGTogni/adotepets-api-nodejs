import request from 'supertest';

import { app } from '@/app';
import { makeOrg } from 'tests/factories/make-org.factory';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Refresh Token (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to refresh token', async () => {
    const org = makeOrg();

    await request(app.server).post('/orgs').send(org).expect(201);

    const authResponse = await request(app.server).post('/orgs/sessions').send({
      email: org.email,
      password: org.password,
    });

    const cookies = authResponse.get('Set-Cookie') || [];

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ]);
  });
});
