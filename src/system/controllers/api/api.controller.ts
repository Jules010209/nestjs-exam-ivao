import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}
    // @Post('/post/callback')
    // APIPostCallback(@Body, body) {

    // }

    @Get('/get/:id')
    async APIGetId(@Param('id') id:any) {
        return await this.apiService.findUser(id);
    }

    @Get('/calendar/:day')
    async APIGetCalendar(@Param('day') day:any) {
        return await this.apiService.getCalendar(day);
    }
}