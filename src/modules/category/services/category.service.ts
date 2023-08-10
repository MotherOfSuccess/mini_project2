import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategotyEntity } from '../../../entities/category.entity';
import { DeleteResult, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'
import { NotSuccessException } from '../../../exceptions/NotSuccessException';
import { NotFoundException } from '../../../exceptions/NotFoundException';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategotyEntity) private readonly categoryRepository: Repository<CategotyEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async getAll(): Promise<CategotyEntity[]> {
        const categories = await this.categoryRepository.find()

        if (categories) {

            return categories
        }
        return null
    }

    async addCategory(category: CreateCategoryDto): Promise<CategotyEntity> {

        this.cacheManager.del("category_all")

        return await this.categoryRepository.save(category)
    }

    async updateCategory(id: number, categoryUpdate: UpdateCategoryDto): Promise<CategotyEntity> {
        const category = await this.findCategoryByID(id)

        if (category) {
            this.cacheManager.del("category_all")
            await this.categoryRepository.update({ id: id }, categoryUpdate)

            const categoryAfter = await this.findCategoryByID(id)
            return categoryAfter
        }

        throw new NotFoundException("Category", "Not found category to update")

    }

    async deleteCategory(id: number): Promise<CategotyEntity> {
        const category = await this.findCategoryByID(id)

        if (category) {
            try{

                this.cacheManager.del("category_all")
                await this.categoryRepository.delete({ id: id })

                return category
                
            } catch {
                throw new NotSuccessException('delete category', "Category is a foreign key on another table")
            }
        }

        throw new NotFoundException("Category", "Not found category to delete")
    }

    async findCategoryByID(id: number): Promise<CategotyEntity> {
        const option: FindOneOptions<CategotyEntity> = await { where: { id: id } }
        const category = await this.categoryRepository.findOne(option)

        if (category) {

            return await this.categoryRepository.findOne(option)
        }

        return null

    }
}
