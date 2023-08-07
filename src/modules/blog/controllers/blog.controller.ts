import { 
    Body, 
    Controller, 
    FileTypeValidator, 
    Get, 
    Inject, 
    MaxFileSizeValidator, 
    Param, 
    ParseFilePipe, 
    Post, 
    Request, 
    UploadedFiles, 
    UseGuards, 
    UseInterceptors, 
} from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AppInterceptor } from '../../../interceptors';

@UseInterceptors(AppInterceptor)
@Controller('blog')
export class BlogController {
    constructor(
        private blogService: BlogService,
    ){}

    @Get('all')
    getAll(){
        console.log('Get All')
        return this.blogService.getAll()
    }

    @UseGuards(AuthGuard)
    @Post('add')
    addBlog(@Request() req, @Body() blog: CreateBlogDto) {
        return this.blogService.addBlog(blog, req.user.id);
    }

    @Post('update/:id')
    updateBlog(@Param('id') id: number, @Body() blog: UpdateBlogDto){
        return this.blogService.updateBlog(id, blog)
    } 

    @Get('delete/:id')
    deleteBlog(@Param('id') id: number){
        return this.blogService.deleteBlog(id)
    }

    @Post('upload/:id')
    @UseInterceptors(FilesInterceptor('image'))
    uploadImage(@Param('id') id: number, @UploadedFiles(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 100000 * 10 }),
                new FileTypeValidator({ fileType: 'image' }),
            ],
            fileIsRequired: false,
        })
    ) images: Array<Express.Multer.File>) : string{
        
        const arrayImage = images.map((image) => {return image.destination})

        const updateUrl: UpdateBlogDto = {image: arrayImage}
        
        this.blogService.updateBlog(id, updateUrl)

        return 'Success'
    }
    
}
