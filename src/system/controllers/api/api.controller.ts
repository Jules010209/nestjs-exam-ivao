import { Body, Controller, Get, Param, Post, Res, Session, UnauthorizedException } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}
    @Post('/post/callback')
    async APIPostCallback(@Body() body:any, @Res() res:any, @Session() session:any) {
        return await this.apiService.bookPosition(body, res, session);
    }

    @Get('/get/:id')
    async APIGetId(@Param('id') id:any) {
        return await this.apiService.findUser(id);
    }

    @Get('/calendar/:day')
    async APIGetCalendar(@Param('day') day:any) {
        return await this.apiService.getCalendar(day);
    }

    @Get('/calendar')
    async APIRedirectCalendar(@Res() res:any, @Session() session:Record<string, any>) {
        var currDate = new Date();
        var year = currDate.toLocaleString('en-US', { year: 'numeric'});
        var month = currDate.toLocaleString('en-US', { month: '2-digit'});
        var day = currDate.toLocaleString('en-US', { day: '2-digit'});

        if(!session.user_id) throw new UnauthorizedException("You don't have this permission sorry.");
        
        return await res.redirect(`/api/calendar/${year + "-" + month + "-" + day}`);
    }
}