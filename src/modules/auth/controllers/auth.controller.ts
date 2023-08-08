import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { LoginDto } from '../dtos/login.dto';
import { renewDto } from '../dtos/renew.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() userLogin: LoginDto){
        return this.authService.login(userLogin);
    }

    @Post('renew')
    refresh(@Body() token: renewDto){
        return this.authService.refresh(token);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req){
        return req.user;
    }

    @UseGuards(AuthGuard)
    @Get('logout')
    async logout(@Req() req) {
        return this.authService.logout(req.id)
    }

    
}
