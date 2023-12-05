import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages, appDefinedErrors } from './app-defined-errors';
interface ErrorObject {
  customErrorcode?: number;
  customErrorMessage?: string;
  details?: string;
}

export class AppCustomException extends HttpException {
  static appErrors: ErrorMessages = 'badRequest';
  static appCodes = {
    // 1000 - 1999: User management related errors
    badRequest: { customCode: 1000, httpCode: HttpStatus.BAD_REQUEST },
    userNotProvided: { customCode: 1001, httpCode: HttpStatus.BAD_REQUEST },
    userNotFound: { customCode: 1002, httpCode: HttpStatus.NOT_FOUND },
    userAlreadyHasProfile: {
      customCode: 1003,
      httpCode: HttpStatus.BAD_REQUEST,
    },
    cityNameDuplicated: {
      customCode: 1004,
      httpCode: HttpStatus.BAD_REQUEST,
    },
    passwordNotMatched: {
      customCode: 1005,
      httpCode: HttpStatus.BAD_REQUEST,
    },
    // 2000 - 2999: Product management related errors
    // 3000 - 3999: Order management related errors
    // 4000 - 4999: Cart management related errors
    // 5000 - 5999: Payment management related errors
    // 6000 - 6999: Shipping management related errors
    // 7000 - 7999: Notification management related errors
    // 8000 - 8999: Firebase management related errors
    createFirebaseUserFailed: {
      customCode: 8000,
      httpCode: HttpStatus.BAD_REQUEST,
    },
    googleAccountInvalid: {
      customCode: 8001,
      httpCode: HttpStatus.BAD_REQUEST,
    },
    // 9000 - 9999: Address management related error

    provinceNameDuplicated: {
      customCode: 9000,
      httpCode: HttpStatus.BAD_REQUEST,
    },
    // 10000 - 10999: Unidentified thrown exceptions
    unidentifiedThrownException: {
      customCode: 10000,
      httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
    },
  };
  constructor(customError = AppCustomException.appErrors) {
    const errorObject: ErrorObject = {};
    // Detect new errors that are not one of App Custom Errors (Thrown by app custom exceptions)
    if (appDefinedErrors.indexOf(customError) === -1) {
      errorObject.details = customError;
      customError = 'unidentifiedThrownException';
    }

    errorObject.customErrorcode =
      AppCustomException.appCodes[customError].customCode;
    errorObject.customErrorMessage = customError;

    super(errorObject, AppCustomException.appCodes[customError].httpCode);
  }
}
