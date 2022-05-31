import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {checking, generateFinalMonitorReport} from '../service/monitor';

export default async function apiController(fastify: FastifyInstance) {
  fastify.get('/health', returnMonitorResult);
  fastify.get('/health-now', returnNow);
}

async function returnMonitorResult(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await reply.code(200).send(await generateFinalMonitorReport());
  } catch (err) {
    reply.code(500).send(err);
  }
}

async function returnNow(request: FastifyRequest, reply: FastifyReply) {
  try {
    await reply.code(200).send(await checking());
  } catch (err) {
    reply.code(500).send(err);
  }
}
