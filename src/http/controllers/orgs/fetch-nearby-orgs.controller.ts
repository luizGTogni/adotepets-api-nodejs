import { OrgNotFoundError } from '@/use-cases/errors/org-not-found.error';
import { makeFetchNearbyPetsUseCase } from '@/use-cases/factories/make-fetch-nearby-orgs-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function fetchNearbyOrgsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchNearbyOrgsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = fetchNearbyOrgsQuerySchema.parse(
    request.query
  );

  try {
    const fetchNearbyOrgsUseCase = makeFetchNearbyPetsUseCase();

    const { orgs } = await fetchNearbyOrgsUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    });

    return reply.status(200).send({ orgs });
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }


}
