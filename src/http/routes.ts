import type { FastifyInstance } from 'fastify';
import { authenticateOrgController } from './controllers/authenticate-org.controller';
import { createOrgController } from './controllers/create-org.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController);

  app.post('/sessions', authenticateOrgController);
}
