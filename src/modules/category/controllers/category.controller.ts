import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

import { AppInterceptor } from '../../../interceptors';

@UseInterceptors(AppInterceptor)
@Controller('category')
export class CategoryController {
    constructor (private categoryService: CategoryService) {}

    @Get('all')
    getAll() {
        return this.categoryService.getAll();
    }

    @Get('find/:id')
    findCategory(@Param('id') id: number) {
        return this.categoryService.findCategoryByID(id)
    }

    @Post('add')
    addCategory(@Body() category: CreateCategoryDto) {
        return this.categoryService.addCategory(category)
    }

    @Put('update/:id')
    updateCategory(@Param('id') id: number, @Body() category: UpdateCategoryDto) {
        return this.categoryService.updateCategory(id, category)
    }

    @Delete('delete/:id')
    deleteCategory(@Param('id') id: number){
        return this.categoryService.deleteCategory(id)
    }


}
