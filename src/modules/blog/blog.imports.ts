import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogEntity } from "../../entities/blog.entity";
import { BlogService } from "./services/blog.service";
import { BlogController } from "./controllers/blog.controller";
import { CategotyEntity } from "../../entities/category.entity";
import { UserEntity } from "../../entities/user.entity";
import { MulterModule } from "@nestjs/platform-express";
import { multerFactory } from "../../factories/multer.factory";
import { UserModule } from "../user/user.module";
import { CategoryModule } from "../category/category.module";


export const modules = [
    TypeOrmModule.forFeature([
        BlogEntity, 
        CategotyEntity, 
        UserEntity,
    ]),
    MulterModule.register(multerFactory),
    UserModule,
    CategoryModule,

]

export const providers = [BlogService]

export const controllers = [BlogController]

export const exps = [BlogService]