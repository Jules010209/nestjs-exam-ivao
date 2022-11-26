import { Controller, Get, Render, Req, Session } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/profile')
    @Render('profile')
    async getProfile(@Req() req:any, @Session() session:any) {
        return { session: req.session, userInfo: this.userService.getProfile(session) };
    }
}
