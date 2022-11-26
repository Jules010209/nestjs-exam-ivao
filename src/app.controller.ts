import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Render('home')
    root(@Req() req:any) {
        return { session: req.session };
    }

    @Get('/atcs')
    @Render('atcs')
    atcs(@Req() req:any) {
        return { session: req.session };
    }
}