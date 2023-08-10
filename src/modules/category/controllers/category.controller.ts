import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { AppInterceptor } from '../../../interceptors';
import { getRespone } from '../../../utils';
import { NotFoundException } from '../../../exceptions/NotFoundException';
import { NotSuccessException } from '../../../exceptions/NotSuccessException';

@UseInterceptors(AppInterceptor)
@Controller('category')
export class CategoryController {
    constructor (private categoryService: CategoryService) {}

    @Get('all')
    async getAll() {
        const temp = await this.categoryService.getAll();
        if(temp){
            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotFoundException("all category")
    }

    @Get('find/:id')
    async findCategory(@Param('id') id: number) {
        const temp = await this.categoryService.findCategoryByID(id)
        if(temp){
            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotFoundException('category')
    }

    @Post('add')
    async addCategory(@Body() category: CreateCategoryDto) {
        const temp = await this.categoryService.addCategory(category)
        if(temp){
            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotSuccessException('add category')
    }

    @Put('update/:id')
    async updateCategory(@Param('id') id: number, @Body() category: UpdateCategoryDto) {
        const temp = await this.categoryService.updateCategory(id, category)
        if(temp){
            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotSuccessException('update category')
    }

    @Delete('delete/:id')
    async deleteCategory(@Param('id') id: number){
        const temp = await this.categoryService.deleteCategory(id)
        if(temp){
            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotSuccessException('delete category')
    }


}
