import { ExecutionContext, CallHandler } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;
  let mockContext: ExecutionContext;
  let mockCallHandler: CallHandler;

  beforeEach(() => {
    interceptor = new LoggingInterceptor();
    mockContext = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({
          method: 'GET',
          url: '/test',
          headers: {},
        })),
      })),
    } as unknown as ExecutionContext;
    mockCallHandler = {
      handle: jest.fn(),
    } as CallHandler;
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('log request information', async () => {

    jest.spyOn(console, 'log').mockImplementation();

    await interceptor.intercept(mockContext, mockCallHandler);

    expect(console.log).toHaveBeenCalledWith('[KAFKA EVENT]', {
      method: 'GET',
      url: '/test',
      headers: {},
    });
  });

});
