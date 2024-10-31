import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { orgsRoutes } from './http/controllers/orgs/orgs.routes';
import { petsRoutes } from './http/controllers/pets/pets.routes';

export const app = fastify();

app.register(orgsRoutes);
app.register(petsRoutes);

app.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: err.format });
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(err);
  } else {
    // Log External: Ex: Datadog, NewRelic, Sentry...
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
