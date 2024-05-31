import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from '../../infrastructure/exceptions/http.exception.filter';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { FormatResponseInterceptor } from '../interceptors/format-response.interceptor';

@UseInterceptors(FormatResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor)
@Controller()
export class BaseController {}
