import fastify from 'fastify';
import cors from 'fastify-cors';
import {LOGGER} from './constant';
import router from './controller/route';

export function startApiServer() {
  const FASTIFY_PORT = process.env.FASTIFY_PORT || 3106;
  const FASTIFY_ADDRESS = process.env.FASTIFY_ADDRESS || '127.0.0.1';

  const server = fastify({
    logger: LOGGER,
    trustProxy: true,
    bodyLimit: 10485760, // 10 MiB
  });
  server
    .register(cors)
    .after(err => {
      if (err) {
        console.log(`register plugins failed: ${err.message}`);
        throw err;
      }
    })
    .register(router)
    .ready()
    .then(
      () => {
        LOGGER.info('Server successfully booted!');
      },
      err => {
        LOGGER.trace('Server start error', err);
      }
    );

  server.listen(FASTIFY_PORT, FASTIFY_ADDRESS).then(() => {
    server.log.info(`🚀  Api Server running on port ${FASTIFY_PORT}`);
  });
}
