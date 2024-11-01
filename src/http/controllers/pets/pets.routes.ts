import { FastifyInstance } from 'fastify';

import { VerifyJwt } from '@/http/middlewares/verify-jwt';
import { createPetController } from './create-pet.controller';
import { getPetController } from './get-pet.controller';
import { searchPetsController } from './search-pets.controller';

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [VerifyJwt] }, createPetController);
  app.get('/pets', searchPetsController);
  app.get('/pets/:id', getPetController);
}
