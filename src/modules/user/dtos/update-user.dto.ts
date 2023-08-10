import { Transform } from "class-transformer"
import { IsBiggerThan } from "../../../decorators/decorator"
import { IsOptional } from "class-validator"

export class UpdateUserDto {
    @IsOptional()
    @Transform(({value}) => value?.toString().trim())
    readonly name?: string

    @IsOptional()
    @Transform(({value}) => value?.toString().trim())
    readonly gender?: string

    @IsOptional()
    @IsBiggerThan(18)
    readonly age?: number

    @IsOptional()
    @Transform(({value}) => value?.toString().trim())
    readonly password?: string

    @IsOptional()
    readonly refreshToken?: string

    @IsOptional()
    readonly accessToken?: string
}