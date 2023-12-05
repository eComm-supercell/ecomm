import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';
import { PrismaExptionHandler } from './prisma-exception-handler';

/**
 * Catch all app exceptions
 */
@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(
      '🚀 ~ file: custom-exception.filter.ts:17 ~ LoggerExceptionFilter ~ exception:',
      exception,
    );

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    console.log(request.url, 'URL');
    console.log(request.headers, 'HEADERS');

    let status = HttpStatus.INTERNAL_SERVER_ERROR; // default 500 internal server error

    /**
     * Handle validation error response
     */
    if (Array.isArray(exception)) {
      status = HttpStatus.BAD_REQUEST;

      return response.status(status).json({
        time: new Date().toISOString(),
        path: request.url,
        customErrorMessage: 'validation_error',
        customErrorCode: 999,
        validation: exception,
      });
    }

    /**
     * Handle Prisma error response
     */
    if (exception instanceof PrismaClientKnownRequestError) {
      const eror = new PrismaExptionHandler(exception);
      status = HttpStatus.BAD_REQUEST;

      return response.status(status).json({
        time: new Date().toISOString(),
        path: request.url,
        errorCode: exception.code,
        prismaError: eror.errorMessage,
      });
    }

    /**
     * Handle Http error responses (including instances of AppCustomError class)
     */
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errResponse = exception.getResponse();

      if (typeof errResponse === 'string') {
        // Nestjs built-in http exceptions
        return response.status(status).json(errResponse);
      } else {
        // App custom exceptions
        return response.status(status).json({
          time: new Date().toISOString(),
          path: request.url,
          ...errResponse,
        });
      }
    }

    /**
     * Rest of errors
     */
    return response.status(status).json(exception.message || 'server error');
  }
}
