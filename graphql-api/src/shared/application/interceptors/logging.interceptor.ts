import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): any {
    const server = GqlExecutionContext.create(context).getContext();
    console.log(`Graphql-api logging`, server.req.baseUrl);

    return next.handle();
  }
}
