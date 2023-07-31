import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { controllers, modules, providers } from './auth.imports';

@Module({
  imports: modules,
  controllers: controllers,
  providers: providers,
})
export class AuthModule {}
