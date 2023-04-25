import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Render('home')
    root(@Req() req: Request) {
        return { session: req.session };
    }

    @Get('/atcs')
    @Render('atcs')
    atcs(@Req() req: Request) {
        return { session: req.session };
    }
}