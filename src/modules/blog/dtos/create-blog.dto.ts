export class CreateBlogDto {

    readonly id_author: number

    readonly name: string

    readonly categoryid: number

    readonly content: string

    readonly image?: string[]

    readonly datetime: string

}