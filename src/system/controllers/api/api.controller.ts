import { Body, Controller, Get, Param, Post, Res, Session, UnauthorizedException } from '@nestjs/common';
import { ApiService } from './api.service';
import { Response } from 'express';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    @Post('/post/callback')
    async APIPostCallback(@Body() body:any, @Res() res: Response, @Session() session: Record<string, any>) {
        return await this.apiService.bookPosition(body, res, session);
    }

    @Get('/get/:id')
    async APIGetId(@Param('id') id: number) {
        return await this.apiService.findUser(id);
    }

    @Get('/calendar/:day')
    async APIGetCalendar(@Param('day') day: any) {
        return await this.apiService.getCalendar(day);
    }

    @Get('/calendar')
    async APIRedirectCalendar(@Res() res: Response, @Session() session: Record<string, any>) {
        var currDate = new Date();

        var year = currDate.toLocaleString('en-US', { year: 'numeric'});
        var month = currDate.toLocaleString('en-US', { month: '2-digit'});
        var day = currDate.toLocaleString('en-US', { day: '2-digit'});

        if(!session.user_id) throw new UnauthorizedException("You don't have this permission sorry.");
        
        return res.redirect(`/api/calendar/${year + "-" + month + "-" + day}`);
    }
}