import { FastifyInstance } from 'fastify';

import { createOrgController } from '@/http/controllers/orgs/create-org.controller';
import { VerifyJwt } from '@/http/middlewares/verify-jwt';
import { getPetController } from './get-pet.controller';
import { searchPetsController } from './search-pets.controller';

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [VerifyJwt] }, createOrgController);
  app.get('/pets', searchPetsController);
  app.get('/pets/:id', getPetController);
}
