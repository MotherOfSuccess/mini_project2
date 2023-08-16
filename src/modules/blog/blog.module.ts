import { Module } from '@nestjs/common';
import { controllers, exps, modules, providers } from './blog.imports';
import { ImageService } from './services/image/image.service';

@Module({
  imports: modules,

  controllers: controllers,

  providers: providers,

  exports: exps,
})
export class BlogModule {}
