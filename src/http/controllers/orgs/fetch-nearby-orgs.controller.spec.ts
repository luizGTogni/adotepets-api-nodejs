import request from 'supertest';

import { app } from '@/app';
import { makeOrg } from 'tests/factories/make-org.factory';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Fetch Nearby Orgs (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to fetch nearby orgs', async () => {
    const org = makeOrg();

    await request(app.server).post('/orgs').send(org).expect(201);
    await request(app.server).post('/orgs').send(makeOrg({ latitude: org.latitude, longitude: org.longitude })).expect(201);
    await request(app.server).post('/orgs').send(makeOrg({ latitude: org.latitude, longitude: org.longitude })).expect(201);

    const response = await request(app.server).get('/orgs/nearby').query({
      latitude: org.latitude,
      longitude: org.longitude
    });

    console.log(response)

    expect(response.status).toBe(200);
    expect(response.body.orgs).toHaveLength(3)
    expect(response.body.orgs[0].name).toEqual(org.name)
  });
});
