import { FastifyInstance } from 'fastify';

import { authenticateOrgController } from '@/http/controllers/orgs/authenticate-org.controller';
import { createOrgController } from '@/http/controllers/orgs/create-org.controller';
import { fetchNearbyOrgsController } from './fetch-nearby-orgs.controller';

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController);
  app.post('/orgs/sessions', authenticateOrgController);
  app.get('/orgs/nearby', fetchNearbyOrgsController);
}
