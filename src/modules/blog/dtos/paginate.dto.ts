import { IsNotEmpty } from "class-validator";
import { IsBiggerThan } from "../../../decorators/decorator";

export class PaginateBlogDto {

    @IsNotEmpty()
    @IsBiggerThan(0) 
    page: number 

    @IsNotEmpty()
    @IsBiggerThan(0)
    limit: number

}
