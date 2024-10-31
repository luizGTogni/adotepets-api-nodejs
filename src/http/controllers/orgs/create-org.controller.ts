import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists.error';
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case';
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

  let org = null;
  try {
    const createOrgUseCase = makeCreateOrgUseCase();

    org = await createOrgUseCase.execute(body);
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send(org);
}
