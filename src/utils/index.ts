import { Injectable, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { AppMiddleware } from "../middlewares";

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

    return key
}