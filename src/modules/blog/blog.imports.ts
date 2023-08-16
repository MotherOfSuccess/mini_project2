import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogEntity } from "../../entities/blog.entity";
import { BlogService } from "./services/blog/blog.service";
import { BlogController } from "./controllers/blog.controller";
import { CategotyEntity } from "../../entities/category.entity";
import { UserEntity } from "../../entities/user.entity";
import { MulterModule } from "@nestjs/platform-express";
import { multerFactory } from "../../factories/multer.factory";
import { UserModule } from "../user/user.module";
import { CategoryModule } from "../category/category.module";
import { ImageEntity } from "../../entities/image.entity";
import { ImageService } from "./services/image/image.service";
import { ConfigService } from "@nestjs/config";


export const modules = [
    TypeOrmModule.forFeature([
        BlogEntity, 
        CategotyEntity, 
        UserEntity,
        ImageEntity,
    ]),
    MulterModule.registerAsync(
        imports: [],
        inject: [ConfigService],
        useFactory: multerFactory,
    ),
    UserModule,
    CategoryModule,

]

export const providers = [BlogService, ImageService]

export const controllers = [BlogController]

export const exps = [BlogService]