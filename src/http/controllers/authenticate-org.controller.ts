import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository';
import { AuthenticateOrgUseCase } from '@/use-cases/authenticate-org.use-case';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticateOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateOrgBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateOrgBodySchema.parse(request.body);

  try {
    const prismaOrgsRepository = new PrismaOrgsRepository();
    const authenticateUseCase = new AuthenticateOrgUseCase(
      prismaOrgsRepository
    );

    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send();
}
