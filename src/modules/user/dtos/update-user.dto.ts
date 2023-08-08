import { Transform } from "class-transformer"
import { IsBiggerThan } from "../../../decorators/decorator"
import { Max } from "class-validator"

export class UpdateUserDto {
    @Transform(({value}) => value?.toString().trim())
    readonly name?: string

    @Transform(({value}) => value?.toString().trim())
    readonly gender?: string

    @IsBiggerThan(18)
    readonly age?: number

    @Transform(({value}) => value?.toString().trim())
    readonly password?: string

    readonly refreshToken?: string
    readonly accessToken?: string
}