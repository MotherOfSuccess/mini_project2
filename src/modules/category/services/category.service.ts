import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategotyEntity } from '../../../entities/category.entity';
import { DeleteResult, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class CategoryService {
    constructor (
        @InjectRepository(CategotyEntity) private readonly categoryRepository: Repository<CategotyEntity>
    ){}

    async getAll(): Promise<CategotyEntity[]>{
        const categories = await this.categoryRepository.find()

        if(categories){

            return categories
        }
        throw new NotFoundException("Categories is not found")
    }

    async addCategory(category: CreateCategoryDto): Promise<CategotyEntity> {
        return await this.categoryRepository.save(category)
    }

    async updateCategory(id: number, categoryUpdate: UpdateCategoryDto): Promise<UpdateResult> {
        const category = await this.findCategoryByID(id)

        if(category){

            return await this.categoryRepository.update({id: id}, categoryUpdate)
        }
        
        throw new NotFoundException("Category is not found")
    }

    async deleteCategory(id: number): Promise<DeleteResult> {
        const category = await this.findCategoryByID(id)

        if(category) {

            return await this.categoryRepository.delete({id: id})
        }

        throw new NotFoundException("Category is not found")
    }

    async findCategoryByID(id: number): Promise<CategotyEntity> {
        const option: FindOneOptions<CategotyEntity> = {where: {id: id}}
        const category = this.categoryRepository.findOne(option)

        if(category) {

            return await this.categoryRepository.findOne(option)
        }

        throw new NotFoundException("Category is not found")
    }
}
