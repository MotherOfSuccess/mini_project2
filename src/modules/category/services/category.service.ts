import { Injectable } from '@nestjs/common';
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
        return await this.categoryRepository.find()
    }

    async addCategory(category: CreateCategoryDto): Promise<CategotyEntity> {
        return await this.categoryRepository.save(category)
    }

    async updateCategory(id: number, category: UpdateCategoryDto): Promise<UpdateResult> {
        return await this.categoryRepository.update({id: id}, category)
    }

    async deleteCategory(id: number): Promise<DeleteResult> {
        return await this.categoryRepository.delete({id: id})
    }

    async findCategoryByID(id: number): Promise<CategotyEntity> {
        const option: FindOneOptions<CategotyEntity> = {where: {id: id}}
        return await this.categoryRepository.findOne(option)
    }
}
