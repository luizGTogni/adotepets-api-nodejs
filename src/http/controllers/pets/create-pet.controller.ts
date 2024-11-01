import { OrgNotFoundError } from '@/use-cases/errors/org-not-found.error';
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.number(),
    size: z.string(),
    energy_level: z.string(),
  });

  try {
    const body = createPetBodySchema.parse(request.body);

    const createPetUseCase = makeCreatePetUseCase();

    const org_id = request.user.sub;

    const { pet } = await createPetUseCase.execute({ ...body, org_id });

    return reply.status(201).send({ pet });
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
