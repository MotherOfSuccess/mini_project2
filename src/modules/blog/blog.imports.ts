import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogEntity } from "./models/blog.entity";
import { BlogService } from "./services/blog/blog.service";
import { BlogController } from "./controllers/blog/blog.controller";
import { CategotyEntity } from "../category/models/category.entity";
import { UserEntity } from "../user/models/user.entity";
import { CategoryService } from "../category/services/category.service";
import { UserService } from "../user/services/user/user.service";

export const modules = [
    TypeOrmModule.forFeature([BlogEntity, CategotyEntity, UserEntity])
]

export const providers = [BlogService, UserService, CategoryService]

export const controllers = [BlogController]