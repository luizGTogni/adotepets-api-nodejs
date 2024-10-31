import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error';
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getPetRouteSchema = z.object({
    id: z.string(),
  });

  const { id } = getPetRouteSchema.parse(request.body);

  let pet = null;
  try {
    const getPetUseCase = makeGetPetUseCase();

    pet = await getPetUseCase.execute({ id });
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send(pet);
}
