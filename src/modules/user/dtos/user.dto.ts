export class User {
    readonly id: string
    readonly name: string
    readonly gender: string
    readonly age: number
    readonly password: string
    readonly refreshToken?: string
    readonly accessToken?: string
}