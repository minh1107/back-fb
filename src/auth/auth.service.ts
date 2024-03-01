import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./entity/auth.entity";
import { Repository } from "typeorm";
import { UsersService } from "src/users/users.service";
import { registerDto } from "./dto/register.tdo";
import { MailService } from "src/mail/mail.service";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { loginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt'
import { Users } from "src/users/entity/users.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ) {}

    async registerSendmail(payload: registerDto, res: Response) {
        const token = this.jwtService.sign({
            email: payload.email
        }, {
            expiresIn: `${this.configService.get('EXPIRES_REGISTER_MAIL')}m`,
            secret: this.configService.get('JWT_SECRET')
        }) 
        const url = `${this.configService.get('BACKEND_URL')}/auth/register/${token}`
        await this.mailService.sendUserConfirmation(payload, url)
        const {rePassword, ...finalPayload} = payload
        res.cookie('dataRegister', {token, finalPayload}, {
            maxAge: 15 * 60 * 1000, httpOnly: true});
        return {msg: true}
    }

    // Đăng ký tài khoản
    async register(req: Request,res:Response, tokenParam) {
        const request = req.cookies['dataRegister']
        res.clearCookie('dataRegister')
        let success = false
        if(request) {
            if(request.token === tokenParam) {
                const isCreateUser = this.userService.create(request.finalPayload)
                if(isCreateUser) {
                    res.redirect(`${this.configService.get('FRONTEND_URL')}/finalregister/true`)
                    success = true
                }
            } 
        } 
        if(success===false) {
            res.redirect(`${this.configService.get('FRONTEND_URL')}/finalregister/false`)
        }
    }

    async login(payload: loginDto) {
        const email = payload.email
        const  password = payload.password
        const checkUser = await this.userService.findByEmail(email)
        if(!checkUser) {
            return {msg: 'Email không tồn tại'}
        }
        const isPasswordCorrect = await bcrypt.compare(password, checkUser.password)
        if(isPasswordCorrect) {
            const accessToken = this.jwtService.sign({
                user_id: checkUser.user_id
            },
            {
                expiresIn: `${this.configService.get('EXPIRES_ACCESS_TOKEN')}d`,
                secret: this.configService.get('JWT_SECRET')
            })
            const refreshToken = this.jwtService.sign({
                user_id: checkUser.user_id
            },
            {
                expiresIn: `${this.configService.get('EXPIRES_REFRESH_TOKEN')}d`,
                secret: this.configService.get('JWT_SECRET')
            })
            const session = this.authRepository.create({
                refresh_token: refreshToken,
                expiredTime: new Date(Date.now() + this.configService.get('EXPIRES_REFRESH_TOKEN') * 24 * 60 * 60 * 1000),
                user_id: checkUser.user_id,
                user: checkUser
            })
            const {password, ...userInfo} = checkUser
            await this.authRepository.save(session)
            return {
                accessToken, 
                refreshToken,
                user: userInfo,
                status: true,
                message: 'Đăng nhập thành công'
            }
        } else {
            return {message: 'Thông tin đăng nhập không chính xác', status: false}
        }
    }

    async logout(userId) {
        const res = this.authRepository.delete({user_id: userId} )
        if((await res).affected > 0) {
            return {message: "Đăng xuất thành công", status: true}
        } else return {message: "Đăng xuất thất bại", status: false}
    }
}