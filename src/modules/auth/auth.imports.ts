import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { jwtFactory } from '../../factories/jwt.factory';
import { ConfigModule } from '@nestjs/config';

export const modules = [
  UserModule,
  JwtModule.register(jwtFactory),
  ConfigModule,
];

export const providers = [AuthService];

export const controllers = [AuthController];

export const exps = [AuthService];
