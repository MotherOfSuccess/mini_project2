import { Module } from '@nestjs/common';
import { controllers, exps, modules, providers } from './auth.imports';

@Module({
  
  imports: modules,

  controllers: controllers,

  providers: providers,

  exports: exps,

})
export class AuthModule {}
