import { MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { AppMiddleware } from "../middlewares";
import { NotSuccessException } from "../exceptions/NotSuccessException";

export const applyMiddlewares = (consumer: MiddlewareConsumer) => {
    consumer
        .apply(AppMiddleware)
        .forRoutes(
            {path: 'blog/all', method: RequestMethod.GET},
            {path: 'category/all', method: RequestMethod.GET},
            {path: 'user/all', method: RequestMethod.GET},
        )
}

export const getKey = async (url: string) => {

    const arr = await url.split('/')

    arr.shift()
    
    const key = await arr.join('_')

    return key ?? null
}

export const getRespone = (data: any, errorCode: any, message: string, errors?: string[]) => {  
    return {
        data: data,
        errorCode: errorCode,
        message: message ,
        errors: errors ?? null  
    } 
}

export const validateExtension = (file: any) => {
    const extensionSafe = ['image/jpg', 'image/png', 'image/jpeg']

    if(!extensionSafe.includes(file.mimetype)){
        
        return new NotSuccessException('upload', 'Type of file is not available')
    } 
}

export const validateSize = (file: Express.Multer.File) => {
    const size = file.size
    if(size > 100000) { 
        return new NotSuccessException('upload', 'Files too large')
    }

}
