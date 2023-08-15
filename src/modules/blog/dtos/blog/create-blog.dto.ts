import { Transform } from "class-transformer"
import { IsArray, IsNotEmpty } from "class-validator"

export class CreateBlogDto {

    @IsNotEmpty()
    @Transform(({value}) => value?.toString().trim())
    readonly name: string

    @IsNotEmpty()
    readonly categoryid: number

    @IsNotEmpty()
    @Transform(({value}) => value?.toString().trim())
    readonly content: string

    @IsArray()
    readonly image_id?: number[]


}