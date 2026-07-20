import { Controller, Post, Body, Res, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as Express from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: any) {
        return this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body: any, @Res({ passthrough: true }) res: Express.Response) {
        const { token, user } = await this.authService.login(body);

        res.cookie('session_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 2,
            path: '/',
        });

        return user;
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Express.Response) {
        res.clearCookie('session_token');
        return { message: 'Logged out successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Req() req: any) {
        return req.user;
    }
}

