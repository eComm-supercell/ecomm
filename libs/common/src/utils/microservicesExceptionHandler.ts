import { catchError } from 'rxjs';
import { ErrorMessages } from '../exceptions/app-defined-errors';
import { AppCustomException } from '../exceptions/custom-exception';

/**
 * Handles thrown Rcp exceptions that come from remote microservices.
 * In it's core, it invokes `catchError` from `rxjs` to handle thrown Observer exceptions and finally
 * Throws HTTP exception to be handled in the gate way api and return descriptive errors.
 *
 */
export const handleMicroserviceExceptions = () =>
  catchError((error: { status: number; message: ErrorMessages }) => {
    throw new AppCustomException(error.message);
  });
