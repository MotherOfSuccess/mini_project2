import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository, UpdateResult } from 'typeorm';
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

    async getAll(page: number, limit: number){
        const count = await this.blogReposity.count()
        const count_page = await parseInt((count/limit).toFixed())

        if(count < limit || count_page < page){
            throw new NotFoundException()
        }
        const blogs = await this.blogReposity.findAndCount({
            skip: (page-1)*limit,
            take: limit,
        })
        if(blogs){

            return {count_page, blogs}

        } else {

            throw new NotFoundException("Blog not found")

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

        throw new NotFoundException("User or Category not found")
    }

    async updateBlog(id: number, blogUpdate: UpdateBlogDto): Promise<UpdateResult>{
        
        const user = await this.userService.findOneByID(blogUpdate.id_author)
        const category = await this.categoryService.findCategoryByID(blogUpdate.categoryid)
        const blog = await this.findBlogByID(id)

        if(blog){
            this.resetCache()
            return await this.blogReposity.update({id: id}, {...blogUpdate, id_author: user, categoryid: category})
        }

        throw new NotFoundException("Blog is not found")
    }

    async findBlogByID(id: number): Promise<BlogEntity> {

        const condition: FindOneOptions<BlogEntity> = await {where: {id: id}}
        const blog = await this.blogReposity.findOne(condition)
        
        if(blog) {
            return blog
        }

        throw new NotFoundException("Blog is not found")
    }

    async deleteBlog(id: number): Promise<DeleteResult> {

        const blog = await this.findBlogByID(id)

        if(blog){

            this.resetCache()

            return await this.blogReposity.delete({id: id})
        }

        throw new NotFoundException("Blog not found")

    }

    async resetCache(): Promise<void> {
        const keys = await this.cacheManager.store.keys("blog_all*")
        keys.forEach((k) => {
            this.cacheManager.del(k)
        })
    }
}
