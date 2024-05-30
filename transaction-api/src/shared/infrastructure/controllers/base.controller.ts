import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from '../exceptions/http.exception.filter';
import { LoggingInterceptor } from '../../application/interceptors/logging.interceptor';
import { FormatResponseInterceptor } from '../../application/interceptors/format-response.interceptor';

@UseInterceptors(FormatResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor)
@Controller()
export class BaseController {}
