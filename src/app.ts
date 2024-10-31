import fastify from 'fastify';
import { z } from 'zod';
import { prisma } from './lib/prisma';

export const app = fastify();

app.post('/orgs', async (request, reply) => {
  const requestBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    password: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  });

  const data = requestBodySchema.parse(request.body);

  await prisma.oRG.create({
    data,
  });

  return reply.status(201).send();
});
