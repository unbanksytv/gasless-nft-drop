/* eslint-disable prefer-destructuring, @typescript-eslint/no-var-requires */
import type { SetupWorkerApi } from 'msw';
import type { SetupServerApi } from 'msw/lib/node';

if (typeof window === 'undefined') {
  const server: SetupServerApi = require('./server').server;
  server.listen();
} else {
  const worker: SetupWorkerApi = require('./browser').worker;
  worker.start();
}

export {};
