import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { BlogEntity } from '../../../entities/blog.entity';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UserService } from '../../user/services/user.service';
import { CategoryService } from '../../category/services/category.service';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'
import { NotFoundException } from '../../../exceptions/NotFoundException';


@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogEntity) private readonly blogReposity: Repository<BlogEntity>,
        private readonly userService: UserService,
        private readonly categoryService: CategoryService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ){}


    async getAll(page: number, limit: number){
        const count = await this.blogReposity.count()
        const count_page = await parseInt((count/limit).toFixed())

        const blogs = await this.blogReposity.find({
            relations: {id_author: true, categoryid: true},
            skip: (page-1)*limit,
            take: limit,
        },)

        if(blogs.length != 0){

            return {count_page, blogs}

        } else {

            return null

        }
    }

    async addBlog(blog: CreateBlogDto, id_author: number){
        const currentDate = new Date;


        const user = await this.userService.findOneByID(id_author)
        const category = await this.categoryService.findCategoryByID(blog.categoryid)

        if(user && category){
            
            this.resetCache()

            const blogCreate = {...blog, datetime: currentDate, id_author: user, categoryid: category}
    
            return await this.blogReposity.save(blogCreate)
        }

        return null
    }

    async updateBlog(id: number, blogUpdate: UpdateBlogDto): Promise<BlogEntity>{
        
        const user = await this.userService.findOneByID(blogUpdate.id_author)
        const category = await this.categoryService.findCategoryByID(blogUpdate.categoryid)
        const blog = await this.findBlogByID(id)

        if(!user || !category){
            throw new NotFoundException("User or Category")
        }

        if(blog){
            this.resetCache()
            await this.blogReposity.update({id: id}, {...blogUpdate, id_author: user, categoryid: category})

            const blogAfter = await this.findBlogByID(id)
            return blogAfter

        }
        throw new NotFoundException("Blog")
    }

    async findBlogByID(id: number): Promise<BlogEntity> {

        const condition: FindOneOptions<BlogEntity> = await {where: {id: id}}
        const blog = await this.blogReposity.findOne(condition)
        
        return blog ?? null
    }

    async deleteBlog(id: number): Promise<BlogEntity> {

        const blog = await this.findBlogByID(id)

        if(blog){
            

            this.resetCache()

            await this.blogReposity.delete({id: id})    

            return blog
        }

        throw new NotFoundException("Blog", "Not found blog to delete")

    }

    async resetCache(): Promise<void> {
        const keys = await this.cacheManager.store.keys("blog_all*")
        keys.forEach((k) => {
            this.cacheManager.del(k)
        })
    }
}
