import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error';
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function searchPetsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchPetsQuerySchema = z.object({
    city: z.string().min(1),
    age: z.number().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
  });

  const { city, age, size, energy_level } = searchPetsQuerySchema.parse(
    request.body
  );

  let pets = null;
  try {
    const searchPetsUseCase = makeSearchPetsUseCase();

    pets = await searchPetsUseCase.execute({ city, age, size, energy_level });
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send(pets);
}
