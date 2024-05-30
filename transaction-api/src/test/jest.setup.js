import { Test } from '@nestjs/testing';
import { pgMemProvider } from './pg-mem.provider';

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [pgMemProvider],
  }).compile();
  const app = moduleRef.createNestApplication();
  await app.init();
});
afterAll(async () => {
});
