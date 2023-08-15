import { Inject, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { AppMiddleware } from "../middlewares";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

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

export const getExtensionFile = (originalname: string) => {

    const extension = originalname.split('.')[1]

    return extension

}
