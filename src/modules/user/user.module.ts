import { Module } from '@nestjs/common';
import { controllers, modules, providers } from './user.imports';

@Module({
  imports: modules,
  controllers: controllers,
  providers: providers,
})
export class UserModule {}
