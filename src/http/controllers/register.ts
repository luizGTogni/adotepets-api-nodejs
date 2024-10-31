import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository';
import { OrgsAlreadyExistsError } from '@/use-cases/errors/orgs-already-exists.error';
import { RegisterUseCase } from '@/use-cases/register';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
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

  const body = requestBodySchema.parse(request.body);

  try {
    const prismaOrgsRepository = new PrismaOrgsRepository();
    const registerUseCase = new RegisterUseCase(prismaOrgsRepository);

    await registerUseCase.execute(body);
  } catch (err) {
    if (err instanceof OrgsAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    return reply.status(500).send();
  }

  return reply.status(201).send();
}
