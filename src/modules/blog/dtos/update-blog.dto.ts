import { Transform } from "class-transformer"
import { IsBiggerThan } from "src/decorators/decorator"

export class UpdateBlogDto {

    @IsBiggerThan(0)
    readonly id_author?: number

    @Transform(({value}) => value?.toString().trim())
    readonly name?: string

    @IsBiggerThan(0)
    readonly categoryid?: number

    @Transform(({value}) => value?.toString().trim())
    readonly content?: string

    readonly image?: string[]

    readonly datetime?: Date

}
