import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error';
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getPetParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = getPetParamsSchema.parse(request.params);

  try {
    const getPetUseCase = makeGetPetUseCase();

    const { pet } = await getPetUseCase.execute({ id });

    return reply.status(200).send({ pet });
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
