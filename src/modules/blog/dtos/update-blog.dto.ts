import { CategotyEntity } from "../../../entities/category.entity"
import { UserEntity } from "../../../entities/user.entity"

export class UpdateBlogDto {

    readonly id_author?: number

    readonly name?: string

    readonly categoryid?: number

    readonly content?: string

    readonly image?: string[]

    readonly datetime?: string

}