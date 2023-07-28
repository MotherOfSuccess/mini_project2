import { Controller, Get } from '@nestjs/common';
import { BlogService } from '../../services/blog/blog.service';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService){}
    @Get()
    getAll(){
        return
    }
}
