import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { BlogService } from '../../services/blog/blog.service';
import { CreateBlogDto } from '../../dtos/create-blog.dto';
import { AuthGuard } from '../../../auth/guards/auth.guard';


@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService){}

    @Get('all')
    getAll(){
        return this.blogService.getAll()
    }

    @UseGuards(AuthGuard)
    @Post('add')
    addBlog(@Request() req, @Body() blog: CreateBlogDto) {
        
        return this.blogService.addBlog(blog, req.user.id);
    }
}
