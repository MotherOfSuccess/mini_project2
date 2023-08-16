import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(
    name: string,
    message?: string,
    errors?: string[],
    status?: HttpStatus,
  ) {
    super(
      {
        data: null,
        errorCode: HttpStatus.UNAUTHORIZED,
        message: message ?? `${name} wrong`,
        errors: errors ?? null,
      },
      status || HttpStatus.UNAUTHORIZED,
    );
  }
}
