import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './modules/blog/blog.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { applyMiddlewares } from './utils';
import { CacheModule } from '@nestjs/cache-manager';
import { cacheFactory } from './factories/cache.factory';
import { typeormFactory } from './factories/typeorm.factory';

@Module({
  imports: [
    ConfigModule.forRoot(
      { 
        isGlobal: true,
      }
    ),
    TypeOrmModule.forRootAsync(typeormFactory),
    BlogModule,
    UserModule,
    AuthModule,
    CategoryModule,
    CacheModule.registerAsync(cacheFactory),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      applyMiddlewares(consumer)
  }
}
