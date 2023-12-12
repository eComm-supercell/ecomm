import { catchError } from 'rxjs';
import { AppCustomException } from '../exceptions/custom-exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

/**
 * Handles thrown Rcp exceptions that come from remote microservices.
 * In it's core, it invokes `catchError` from `rxjs` to handle thrown Observer exceptions and finally
 * Throws HTTP exception to be handled in the gate way api and return descriptive errors.
 *
 */
export const handleMicroserviceExceptions = () =>
  catchError((error: any) => {
    // Chek Prisma errors
    if (error.name === 'PrismaClientKnownRequestError') {
      throw new PrismaClientKnownRequestError(
        'manualy_generated_prisma_error',
        {
          ...error,
        },
      );
    }

    // Other erors
    throw new AppCustomException(error.message);
  });
/**
 * Below is descritpion of how error handeling is done between microservices and gate way api:
 * 1- any error can be thrown inside microservices (App error, RcpException, PrismaClientKnownRequestError etc...)
 * 2- The very final error thrown from microservice MUST always be RpcException
 * 3- handleMicroserviceExceptions() is used to handle thrown Rcp exceptions that come from remote microservices. it checks for Prisma errors and throws Prisma error again for the HTTP exception to be able to understand it.
 * 4- Other errors are thrown as AppCustomException
 */
