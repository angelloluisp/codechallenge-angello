import { ExecutionContext, CallHandler } from '@nestjs/common';
import { FormatResponseInterceptor } from './format-response.interceptor';

describe('FormatResponseInterceptor', () => {
  let interceptor: FormatResponseInterceptor;
  let mockContext: ExecutionContext;
  let mockCallHandler: CallHandler;

  beforeEach(() => {
    interceptor = new FormatResponseInterceptor();
    mockContext = {
      switchToHttp: jest.fn(),
    } as unknown as ExecutionContext;
    mockCallHandler = {
      handle: jest.fn(),
    } as CallHandler;
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
});
