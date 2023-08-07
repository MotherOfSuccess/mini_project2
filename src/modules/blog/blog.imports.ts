import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogEntity } from "../../entities/blog.entity";
import { BlogService } from "./services/blog.service";
import { BlogController } from "./controllers/blog.controller";
import { CategotyEntity } from "../../entities/category.entity";
import { UserEntity } from "../../entities/user.entity";
import { CategoryService } from "../category/services/category.service";
import { UserService } from "../user/services/user.service";
import { MulterModule } from "@nestjs/platform-express";
import { multerFactory } from "../../factories/multer.factory";
import { CacheModule } from "@nestjs/cache-manager"
import { cacheFactory } from "../../factories/cache.factory";


export const modules = [
    TypeOrmModule.forFeature([
        BlogEntity, 
        CategotyEntity, 
        UserEntity,
    ]),
    MulterModule.register(multerFactory),
    // CacheModule.registerAsync(cacheFactory),
]

export const providers = [BlogService, UserService, CategoryService]

export const controllers = [BlogController]

export const exps = [BlogService]