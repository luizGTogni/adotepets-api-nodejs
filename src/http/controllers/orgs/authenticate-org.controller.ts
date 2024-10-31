import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error';
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/make-authenticate-org-use-case';
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
    const authenticateUseCase = makeAuthenticateOrgUseCase();

    const { org } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    );

    return reply.status(200).send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
