import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class PrismaExptionHandler {
  constructor(private readonly exption: PrismaClientKnownRequestError) {}

  prismaErrorMsg(target: string[], errorCode: string): string {
    switch (errorCode) {
      case 'P2002':
        return `${target.join(',')} already exists.`;
      case 'P2001':
        return `The ${target} does not exist.`;
      case 'P2005':
        return `Invalid Filed value for ${target}.`;
      case 'P2020':
        return 'value out of range.';
      default:
        return `Operation failed with code ${
          this.errorCode
        }  on target  ${target.join(',')}`;
    }
  }

  get errorCode(): string {
    return this.exption.code.replace('P', '$');
  }

  get errorMessage(): string {
    if (this.exption.meta?.target instanceof Array) {
      return this.prismaErrorMsg(this.exption.meta.target, this.exption.code);
    }

    return this.exption.code;
  }
}
