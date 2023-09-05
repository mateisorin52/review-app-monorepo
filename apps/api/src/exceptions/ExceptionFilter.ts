import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as { message: string; statusCode: number; error: string };

    response.status(status === 400 ? 200 : status).json({
      message: errorResponse.message,
      statusCode: status,
      error: errorResponse.error,
    });
  }
}
