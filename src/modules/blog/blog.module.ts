import { Module } from '@nestjs/common';
import { controllers, modules, providers } from './blog.imports';


@Module({

    imports: modules,

    controllers: controllers,
    
    providers: providers

})
export class BlogModule {}
