/**
 * List of app defined errors that can be thrown by AppCustomException class (libs/common/src/exceptions/custom-exception.ts)
 */
export const appDefinedErrors = [
  'badRequest',
  'emailAlreadyExists',
  'usernameAlreadyExists',
  'userNotProvided',
  'userAlreadyHasProfile',
  'userNotFound',
  'provinceNameDuplicated',
  'cityNameDuplicated',
  'passwordNotMatched',
  'createFirebaseUserFailed',
  'googleAccountInvalid',
];

/**
 * Error messages that can be thrown by AppCustomException class (libs/common/src/exceptions/custom-exception.ts)
 */
export type ErrorMessages =
  | 'badRequest'
  | 'unidentifiedThrownException'
  | 'emailAlreadyExists'
  | 'usernameAlreadyExists'
  | 'userNotProvided'
  | 'userAlreadyHasProfile'
  | 'userNotFound'
  | 'provinceNameDuplicated'
  | 'cityNameDuplicated'
  | 'passwordNotMatched'
  | 'createFirebaseUserFailed'
  | 'googleAccountInvalid';
