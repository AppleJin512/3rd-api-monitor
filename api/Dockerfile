FROM node:16-alpine as builder

COPY . /usr/src/app/
RUN --mount=type=cache,target=/root/.npm/ \
    cd /usr/src/app/ && \
    npm ci -dd && \
    npm run build

FROM node:16-alpine
LABEL "maintainer"="Feng Yu<abcfy2@163.com>"

COPY --from=0 /usr/src/app/dist/ /usr/src/app/
ENV FASTIFY_PORT=3006
ENV FASTIFY_ADDRESS=0.0.0.0
EXPOSE ${FASTIFY_PORT}

RUN adduser -s /bin/false -S -D -H app
USER app

CMD ["node", "/usr/src/app/index.js"]
