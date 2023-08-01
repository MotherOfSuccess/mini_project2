import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './modules/blog/blog.module';
import { UserModule } from './modules/user/user.module';
import { UserEntity } from './modules/user/models/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { CategotyEntity } from './modules/category/models/category.entity';
import { BlogEntity } from './modules/blog/models/blog.entity';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRE_HOST,
      port: parseInt(<string>process.env.POSTGRE_PORT),
      username: process.env.POSTGRE_USER,
      password: process.env.POSTGRE_PASSWORD,
      database: process.env.POSTGRE_DATABASE,
      entities: [UserEntity, CategotyEntity, BlogEntity]
    }),
    BlogModule,
    UserModule,
    AuthModule,
    CategoryModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
