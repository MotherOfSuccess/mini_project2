import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogEntity } from '../../models/blog.entity';
import { CreateBlogDto } from '../../dtos/create-blog.dto';
import { UserService } from '../../../user/services/user/user.service';
import { CategoryService } from '../../../category/services/category.service';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogEntity) private readonly blogReposity: Repository<BlogEntity>,
        private readonly userService: UserService,
        private readonly categoryService: CategoryService
    ){}

    async getAll(): Promise<BlogEntity[]>{
        return await this.blogReposity.find()
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

        const blogCreate = {...blog, datetime: datetime, id_author: user.id, categoryid: category.id}

        console.log(blogCreate)

        return await this.blogReposity.save(blogCreate)
    }
}
