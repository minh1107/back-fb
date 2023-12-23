import { IsEmail, IsNotEmpty, isEmpty } from "class-validator"


export class loginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}