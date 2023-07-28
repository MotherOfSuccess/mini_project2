import { Module } from '@nestjs/common';
import { BlogService } from './services/blog/blog.service';
import { BlogController } from './controllers/blog/blog.controller';


@Module({

    controllers: [BlogController],
    
    providers: [BlogService]

})
export class BlogModule {}
