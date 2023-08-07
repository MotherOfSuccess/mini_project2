import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, NestMiddleware } from "@nestjs/common";
import { Cache } from 'cache-manager'
import { getKey } from "../utils";

export class AppMiddleware implements NestMiddleware {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){}
    async use(req: Request, res: any, next: (error?: any) => void) {

        const key = await getKey(req.url)
        const data = await this.cacheManager.get(key)

        console.log(key)

        if(data) {
            return res.status(200).json(data)
        }


        next()
    }

    
}