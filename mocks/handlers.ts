import { rest } from 'msw';

const handlers = [
  rest.get('/api/hello', (_req, res, ctx) =>
    res(ctx.json<Local.HelloApi>({ name: 'MOCK_NAME', timestamp: Date.now() })),
  ),
];

export default handlers;
