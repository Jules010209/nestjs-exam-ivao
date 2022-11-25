import { Controller, Get, Body } from '@nestjs/common';

@Controller('connexion')
export class ConnexionController {
    @Get('/register')
    async getRegister(@Body body): void {
        
    }
}
