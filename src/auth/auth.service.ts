import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./entity/auth.entity";
import { Repository } from "typeorm";
import { UsersService } from "src/users/users.service";
import { registerDto } from "./dto/register.tdo";
import { MailService } from "src/mail/mail.service";
import { Request, Response } from "express";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly mailService: MailService,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>
    ) {}

    async registerSendmail(payload: registerDto, res: Response) {
        const token = '123'
        const url = `http://localhost:3000/auth/register/${token}`
        const check = await this.mailService.sendUserConfirmation(payload, url)
        console.log(check)
        const {rePassword, ...finalPayload} = payload
        console.log(finalPayload)
        res.cookie('dateRegister', {token, finalPayload: finalPayload}, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            httpOnly: true });
        return {msg: true}
    }

    async register(token: string, req: Request) {
        const request = req.cookies['dateRegister']
        console.log(request)
        return await this.userService.create(request.token, request.finalPayload )
    }
}