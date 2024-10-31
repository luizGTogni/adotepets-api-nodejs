import { FastifyInstance } from 'fastify';

import { createOrgController } from '@/http/controllers/orgs/create-org.controller';
import { VerifyJwt } from '@/http/middlewares/verify-jwt';

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [VerifyJwt] }, createOrgController);
}
