export interface User {
    readonly id?: number
    readonly name: string
    readonly gender: string
    readonly age: number
    readonly username: string
    readonly pasword: string
    readonly refreshToken?: string
    readonly accessToken?: string

}