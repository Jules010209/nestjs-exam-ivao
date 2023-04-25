import { Controller, Get, Post, Body, Render, Res, Session, Req } from '@nestjs/common';
import { ConnexionService } from './connexion.service';
import { Request, Response } from 'express';

@Controller('connexion')
export class ConnexionController {
    constructor(private readonly connexionService: ConnexionService) {}

    @Get('/register')
    @Render('register')
    async getRegister(@Req() req: Request) {
        return { title: 'Register', session: req.session };
    }

    @Get('/login')
    @Render('login')
    async getLogin(@Req() req: Request) {
        return { title: 'Login', session: req.session };
    }
    
    @Post('/register/callback')
    async getRegisterCallback(@Body() body: any, @Res() res: any, @Session() session: Record<string, any>) {
        return this.connexionService.registerCallback(body, res, session);
    }

    @Post('/login/callback')
    async getLoginCallback(@Body() body: any, @Res() res: Response, @Req() req: Request) {
        return this.connexionService.loginCallback(body, res, req);
    }

    @Get('/logout')
    async getLogout(@Res() res: Response, @Session() session: Record<string, any>) {
        return this.connexionService.logout(res, session);
    }
}