import { TypeOrmModule } from "@nestjs/typeorm"
import { CategoryController } from "./controllers/category.controller"
import { CategoryService } from "./services/category.service"
import { CategotyEntity } from "./../../entities/category.entity"

export const modules = [

    TypeOrmModule.forFeature([CategotyEntity])
    
]

export const providers = [CategoryService]

export const controllers = [CategoryController] 

export const exps = [CategoryService]
