import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { getKey } from "../utils";
import { Cache } from 'cache-manager'

@Injectable()
export class AppInterceptor implements NestInterceptor {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){}
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        
        const req = await context.switchToHttp().getRequest()
        const key = await getKey(req.url)

        return next
                .handle()
                .pipe(
                    tap((value) => {

                        if(value){
                            this.cacheManager.set(key, value)
                        }

                    })
                )
    }

    
}