import { HttpException, HttpStatus } from "@nestjs/common";


export class NotFoundException extends HttpException {
    constructor(
        name: string, 
        message?: string, 
        errors?: string[],
        status?: HttpStatus
    )
    {
        super(
            {
            data: null,
            errorCode: HttpStatus.NOT_FOUND,
            message: message ?? `Not found ${name}`,
            errors: errors ?? null
            },
            status || HttpStatus.NOT_FOUND,

        );
    }
    
}