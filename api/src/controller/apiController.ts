import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {generateFinalMonitorReport} from '../service/monitor';

export default async function apiController(fastify: FastifyInstance) {
  fastify.get('/health', returnLastMonitorResult);
}

async function returnLastMonitorResult(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await reply.code(200).send(await generateFinalMonitorReport());
  } catch (err) {
    reply.code(500).send(err);
  }
}
