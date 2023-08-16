import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogEntity } from '../../../../entities/blog.entity';
import { CreateBlogDto } from '../../dtos/blog/create-blog.dto';
import { UserService } from '../../../user/services/user.service';
import { CategoryService } from '../../../category/services/category.service';
import { UpdateBlogDto } from '../../dtos/blog/update-blog.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { NotFoundException } from '../../../../exceptions/NotFoundException';
import { ImageService } from '../image/image.service';
import { NotSuccessException } from '../../../../exceptions/NotSuccessException';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogReposity: Repository<BlogEntity>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    private readonly userService: UserService,

    private readonly categoryService: CategoryService,

    private readonly imageService: ImageService,
  ) {}

  async getAll(page: number, limit: number) {
    const count = await this.blogReposity.count();

    const count_page = await parseInt((count / limit).toFixed());

    const blogs = await this.blogReposity.find({
      relations: { author: true, category: true, image: true },

      skip: (page - 1) * limit,

      take: limit,
    });

    if (blogs.length != 0) {
      return { count_page, blogs };
    } else {
      return null;
    }
  }

  async addBlog(blog: CreateBlogDto, id_author: number) {
    const currentDate = new Date();

    const category = await this.categoryService.findCategoryByID(
      blog.categoryid,
    );

    if (category) {
      this.resetCache();

      const blogCreate = await {
        ...blog,
        datetime: currentDate,
        id_author: id_author,
      };
      console.log(blog.image_id);

      await this.imageService.updateImageStatus(blog.image_id);

      return await this.blogReposity.save(blogCreate);
    }

    return null;
  }

  async updateBlog(
    id_blog: number,
    blogUpdate: UpdateBlogDto,
    id_author: number,
  ): Promise<BlogEntity> {
    const category = await this.categoryService.findCategoryByID(
      blogUpdate.categoryid,
    );

    const image = await this.imageService.findImageByID(blogUpdate.image_id);

    const blog = await this.findBlogByID(id_blog);

    if (blog) {
      if (id_author != blog.id_author) {
        throw new NotSuccessException('update blog', 'You are not author');
      }
      console.log('Run here');

      if (!category) {
        throw new NotFoundException('Category');
      }

      if (!image) {
        throw new NotFoundException('Image');
      }
      this.resetCache();

      await this.blogReposity.update({ id: id_blog }, blogUpdate);

      const blogAfter = await this.findBlogByID(id_blog);

      return blogAfter;
    }

    throw new NotFoundException('Blog');
  }

  async findBlogByID(id: number): Promise<BlogEntity> {
    const _query = this.blogReposity
      .createQueryBuilder('blog')
      .innerJoinAndSelect('blog.category', 'category')
      .innerJoinAndSelect('blog.author', 'author')
      .innerJoinAndSelect('blog.image', 'image')
      .where('blog.id = :id')
      .setParameters({ id });

    return await _query.getOne();
  }

  async deleteBlog(id_blog: number, id_author): Promise<BlogEntity> {
    const blog = await this.findBlogByID(id_blog);
    if (id_author != blog.id_author) {
      throw new NotSuccessException('delete blog', 'You are not author');
    }
    if (blog) {
      this.resetCache();

      await this.blogReposity.delete({ id: id_blog });

      return blog;
    }

    throw new NotFoundException('Blog', 'Not found blog to delete');
  }

  async resetCache(): Promise<void> {
    const keys = await this.cacheManager.store.keys('blog_all*');

    keys.forEach((k) => {
      this.cacheManager.del(k);
    });
  }
}
