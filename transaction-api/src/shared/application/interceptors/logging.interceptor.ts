import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): any {
    const request = context.switchToHttp().getRequest();

    console.log('--- Transaction API Interceptor ---', request.url, request.method);

    return next.handle();
  }
}
