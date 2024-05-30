import { Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: any) {
    const errorResponse = {
      timestamp: new Date().toISOString(),
      code: exception?.code,
      message:
        exception?.response ||
        exception?.message ||
        'Ups ... La consulta al server de graph QL presenta errores',
    };
    return errorResponse;
  }
}
