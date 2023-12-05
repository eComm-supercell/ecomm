import { ApiProperty } from '@nestjs/swagger';

export class ValidatoinDetailsDto {
  @ApiProperty()
  value: string;

  @ApiProperty()
  property: string;

  @ApiProperty()
  children: Array<any>;

  @ApiProperty()
  constraints: {
    property: string;
  };
}

export class CustomAppErrorDto {
  @ApiProperty()
  time: string;
  @ApiProperty()
  path: string;
  @ApiProperty()
  customErrorMessage: string;
  @ApiProperty()
  customErrorCode: string;
}

export class ValdiationErrorDto extends CustomAppErrorDto {
  @ApiProperty()
  validation: ValidatoinDetailsDto[];
}
