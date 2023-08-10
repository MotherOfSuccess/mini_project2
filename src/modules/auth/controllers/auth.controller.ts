import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { LoginDto } from '../dtos/login.dto';
import { renewDto } from '../dtos/renew.dto';
import { getRespone } from '../../../utils';
import { UnauthorizedException } from '../../../exceptions/UnauthorizedException';
import { NotSuccessException } from '../../../exceptions/NotSuccessException';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() userLogin: LoginDto){
        const temp = await this.authService.login(userLogin);
        if(temp){

            return getRespone(temp, HttpStatus.OK, "Login Success")
        }
        throw new UnauthorizedException("Login", "Login Unsuccess")
    }

    @Post('renew')
    async refresh(@Body() token: renewDto){
        const temp = await this.authService.refresh(token);
        if(temp){

            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new UnauthorizedException("Refresh", "Unsuccess")
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Req() req){
        const temp = await req.user
        if(temp){

            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new UnauthorizedException("Get profile", "Profile can not find")

    }

    @UseGuards(AuthGuard)
    @Get('logout')
    async logout(@Req() req) {
        const temp = await this.authService.logout(req.id)
        if(temp){

            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotSuccessException("Logout", "Unsuccess")
    }

    
}
