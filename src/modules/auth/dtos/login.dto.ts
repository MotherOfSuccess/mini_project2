import { Transform } from "class-transformer"
import { IsNotEmpty } from "class-validator"


export class LoginDto {

    @Transform(({value}) => value?.toString().trim())
    @IsNotEmpty({message: "Tài khoản không được rỗng"})
    username: string

    @Transform(({value}) => value?.toString().trim())
    @IsNotEmpty({message: "Mật khẩu không được rỗng"})
    password: string

}