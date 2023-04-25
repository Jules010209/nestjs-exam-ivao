import { Body, Controller, Get, Post, Render, Res, Session } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/profile')
    @Render('profile')
    async getProfile(@Session() session: Record<string, any>) {
        if(session.user_id === undefined || !session.user_id) return { session: session };

        return await this.userService.getProfile(session);
    }
    
    @Get('/edit')
    @Render('edit')
    async getEditProfile(@Session() session: Record<string, any>) {
        return { session: session };
    }

    @Post('/edit/callback')
    async postEditProfile(@Body() body: any, @Res() res: any, @Session() session: Record<string, any>) {
        return await this.userService.postEditProfile(body, res, session);
    }

    @Get('/delete')
    async getDelete(@Res() res: any, @Session() session: Record<string, any>) {
        return await this.userService.deleteBook(res, session);
    }
}