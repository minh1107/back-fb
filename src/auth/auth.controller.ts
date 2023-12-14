import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { registerDto } from "./dto/register.tdo";
import { Request, Response } from "express";

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
    async register(@Param('token') token: string,  
    @Req() req: Request): Promise<any> {
        return await this.authService.register(token, req)
    }
}