import { 
    Body, 
    Controller, 
    FileTypeValidator, 
    Get, 
    HttpStatus, 
    MaxFileSizeValidator, 
    Param, 
    ParseFilePipe, 
    Post, 
    Query, 
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
import { PaginateBlogDto } from '../dtos/paginate.dto';
import { getRespone } from '../../../utils';
import { NotFoundException } from '../../../exceptions/NotFoundException';
import { NotSuccessException } from '../../../exceptions/NotSuccessException';

@UseInterceptors(AppInterceptor)
@Controller('blog')
export class BlogController {
    constructor(
        private blogService: BlogService,
    ){}

    @Get('find/:id')
    async getBlog(@Param('id') id: number){
        const temp = await this.blogService.findBlogByID(id)
        if(temp){

            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotFoundException("Blog")
    }

    @Get('all')
    async getAll(@Query() {page, limit}: PaginateBlogDto){
        const temp = await this.blogService.getAll(page, limit)
        if(temp){
            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotFoundException("Blogs")
    }

    @UseGuards(AuthGuard)
    @Post('add')
    async addBlog(@Request() req, @Body() blog: CreateBlogDto) {
        const temp = await this.blogService.addBlog(blog, req.user.id);
        if(temp){
            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotSuccessException('add blog')
    }

    @Post('update/:id')
    async updateBlog(@Param('id') id: number, @Body() blog: UpdateBlogDto){
        const temp = await this.blogService.updateBlog(id, blog)
        if(temp){
            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotSuccessException('update blog')
    } 

    @Get('delete/:id')
    async deleteBlog(@Param('id') id: number){
        const temp = await this.blogService.deleteBlog(id)
        if(temp){
            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotSuccessException('delete blog')
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
    ) images: Array<Express.Multer.File>) : any{
        
        const arrayImage = images.map((image) => {return image.destination})

        const updateUrl: UpdateBlogDto = {image: arrayImage}
        
        this.blogService.updateBlog(id, updateUrl)

        return getRespone(arrayImage, HttpStatus.OK, "Success")
    }
    
}
