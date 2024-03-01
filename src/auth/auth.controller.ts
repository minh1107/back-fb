import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { registerDto } from "./dto/register.tdo";
import { Request, Response } from "express";
import { loginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/register/sendmail')
    async registerSendmail(@Body() payload: registerDto, 
    @Res({ passthrough: true }) res: Response
    ) {
        return await this.authService.registerSendmail(payload, res)
    }

    @Get('/register/:token')
    async register(@Param('token') tokenParam: string,  
    @Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
        return await this.authService.register(req, res, tokenParam)
    }

    @Post('/login')
    async login(@Body() payload: loginDto) {
        return await this.authService.login(payload)
    }

    @Get('/logout/:uid')
    async logout(@Param('uid') userId: string) {
        return await this.authService.logout(userId)
    }
}