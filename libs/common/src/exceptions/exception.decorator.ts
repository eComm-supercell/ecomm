import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { CustomAppErrorDto, ValdiationErrorDto } from './exceptions.dto';

export function apiExceptionResponse() {
  return applyDecorators(
    ApiExtraModels(CustomAppErrorDto, ValdiationErrorDto),
    ApiBadRequestResponse({
      description: 'System error',
      schema: {
        oneOf: [
          { $ref: getSchemaPath(CustomAppErrorDto) },
          {
            $ref: getSchemaPath(ValdiationErrorDto),
          },
        ],
      },
    }),
  );
}
