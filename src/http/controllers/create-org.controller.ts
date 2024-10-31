import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository';
import { CreateOrgUseCase } from '@/use-cases/create-org.use-case';
import { OrgsAlreadyExistsError } from '@/use-cases/errors/orgs-already-exists.error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string().min(6),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  });

  const body = createOrgBodySchema.parse(request.body);

  try {
    const prismaOrgsRepository = new PrismaOrgsRepository();
    const registerUseCase = new CreateOrgUseCase(prismaOrgsRepository);

    await registerUseCase.execute(body);
  } catch (err) {
    if (err instanceof OrgsAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
