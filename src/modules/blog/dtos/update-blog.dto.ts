import { Transform } from "class-transformer"
import { IsBiggerThan } from "../../../decorators/decorator"
import { IsOptional } from "class-validator"

export class UpdateBlogDto {

    @IsOptional()
    @IsBiggerThan(0)
    readonly id_author?: number

    @IsOptional()
    @Transform(({value}) => value?.toString().trim())
    readonly name?: string

    @IsOptional()
    @IsBiggerThan(0)
    readonly categoryid?: number

    @IsOptional()
    @Transform(({value}) => value?.toString().trim())
    readonly content?: string

    @IsOptional()
    readonly image?: string[]

    @IsOptional()
    readonly datetime?: Date

}
