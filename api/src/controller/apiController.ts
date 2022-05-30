import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {checking} from '../service/endpoints';

export default async function apiController(fastify: FastifyInstance) {
  fastify.get('/health', returnLastMonitorResult);
}

async function returnLastMonitorResult(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await reply.code(200).send(await checking());
  } catch (err) {
    reply.code(500).send(err);
  }
}
