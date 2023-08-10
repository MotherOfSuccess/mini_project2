import { HttpException, HttpStatus } from "@nestjs/common";

export class NotSuccessException extends HttpException {
    constructor(
        method: string, 
        message?: string, 
        errors?: string[],
        status?: HttpStatus
    )
    {
        super(
            {
            data: null,
            errorCode: HttpStatus.BAD_REQUEST,
            message: message ?? `Method ${method} not success`,
            errors: errors ?? null
            },
            status || HttpStatus.BAD_REQUEST,

        );
    }
    
}