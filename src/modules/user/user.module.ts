import { Module } from '@nestjs/common';
import { controllers, exps, modules, providers } from './user.imports';

@Module({
  imports: modules,
  controllers: controllers,
  providers: providers,
  exports: exps
})
export class UserModule {}
