import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from '../services/blog/blog.service';
import { CreateBlogDto } from '../dtos/blog/create-blog.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { UpdateBlogDto } from '../dtos/blog/update-blog.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AppInterceptor } from '../../../interceptors';
import { PaginateBlogDto } from '../dtos/blog/paginate.dto';
import { getRespone } from '../../../utils';
import { NotFoundException } from '../../../exceptions/NotFoundException';
import { NotSuccessException } from '../../../exceptions/NotSuccessException';
import { CreateImageDto } from '../dtos/image/create-image.dto';
import { ImageService } from '../services/image/image.service';

@Controller('blog')
export class BlogController {
  constructor(
    private blogService: BlogService,
    private imageService: ImageService,
  ) {}

  @UseInterceptors(AppInterceptor)
  @Get('find/:id')
  async getBlog(@Param('id') id: number) {
    const temp = await this.blogService.findBlogByID(id);
    if (temp) {
      return getRespone(temp, HttpStatus.OK, 'Success');
    }
    throw new NotFoundException('Blog');
  }

  @UseInterceptors(AppInterceptor)
  @Get('all')
  async getAll(@Query() { page, limit }: PaginateBlogDto) {
    const temp = await this.blogService.getAll(page, limit);
    if (temp) {
      return getRespone(temp, HttpStatus.OK, 'Success');
    }
    throw new NotFoundException('Blogs');
  }

  @UseGuards(AuthGuard)
  @Post('add')
  async addBlog(@Request() req, @Body() blog: CreateBlogDto) {
    const temp = await this.blogService.addBlog(blog, req.user.id);
    if (temp) {
      return getRespone(temp, HttpStatus.OK, 'Success');
    }
    throw new NotSuccessException('add blog');
  }

  @UseGuards(AuthGuard)
  @Post('update/:id')
  async updateBlog(
    @Request() req,
    @Param('id') id_blog: number,
    @Body() blog: UpdateBlogDto,
  ) {
    const temp = await this.blogService.updateBlog(id_blog, blog, req.user.id);
    if (temp) {
      return getRespone(temp, HttpStatus.OK, 'Success');
    }
    throw new NotSuccessException('update blog');
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async deleteBlog(@Request() req, @Param('id') id_blog: number) {
    const temp = await this.blogService.deleteBlog(id_blog, req.user.id);
    if (temp) {
      return getRespone(temp, HttpStatus.OK, 'Success');
    }
    throw new NotSuccessException('delete blog');
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('image'))
  async uploadImage(
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<any> {
    if (images.length > 0) {
      const imageFiles = images.map((img) => {
        const createImage: CreateImageDto = {
          name: img.filename,
          destination: img.destination,
          extension: img.mimetype,
          size: img.size,
        };
        return createImage;
      });

      imageFiles.forEach((imageFile) => {
        this.imageService.uploadImage(imageFile);
      });

      return getRespone(imageFiles, HttpStatus.OK, 'Success');
    } else {
      throw new NotSuccessException('upload', 'No file to upload');
    }
  }
}
