import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BlogEntity } from '../../../entities/blog.entity';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UserService } from '../../user/services/user.service';
import { CategoryService } from '../../category/services/category.service';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogEntity) private readonly blogReposity: Repository<BlogEntity>,
        private readonly userService: UserService,
        private readonly categoryService: CategoryService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ){}

    async getAll(): Promise<BlogEntity[]>{
        const blogs = await this.blogReposity.find()
        return blogs
    }

    async addBlog(blog: CreateBlogDto, id_author: number){
        const currentDate = new Date;

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

        const datetime  = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`

        const user = await this.userService.findOneByID(id_author)
        const category = await this.categoryService.findCategoryByID(blog.categoryid)

        const blogCreate = {...blog, datetime: datetime, id_author: user, categoryid: category}

        console.log(blogCreate)

        return await this.blogReposity.save(blogCreate)
    }

    async updateBlog(id: number, blog: UpdateBlogDto): Promise<UpdateResult>{
        
        const user = await this.userService.findOneByID(blog.id_author)
        const category = await this.categoryService.findCategoryByID(blog.categoryid)

        const blogUpdate = {...blog, id_author: user, categoryid: category}

        return await this.blogReposity.update({id: id}, blogUpdate)

    }

    async deleteBlog(id: number): Promise<DeleteResult> {

        return this.blogReposity.delete({id: id})

    }
}
