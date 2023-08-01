import { Module } from '@nestjs/common';
import { controllers, modules, providers } from './category.imports';


@Module({

  imports: modules,

  controllers: controllers,

  providers: providers,
  
})
export class CategoryModule {}
