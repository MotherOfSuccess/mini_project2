import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user/user.service';
import { LoginDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt' 
import { renewDto } from '../dtos/renew.dto';
import { UserEntity } from '../../user/models/user.entity';


@Injectable()
export class AuthService {
    constructor( 
        private userService: UserService, 
        private jwtService: JwtService, 
        private configService: ConfigService
    ){}
    
    async login(userLogin: LoginDto) {

        const user = await this.userService.findOneByUsername(userLogin.username);

        if(user == null){
            throw new UnauthorizedException()
        }

        const isMatch = await bcrypt.compare(userLogin.password, user.password)

        if(!isMatch){
            throw new UnauthorizedException();
        }

        const refreshToken = await this.getRefreshToken(user.id, user.username);
        const accessToken = await this.getAccessToken(user.id, user.username, refreshToken);

        await this.userService.updateUser(user.id, {refreshToken: refreshToken, accessToken: accessToken});

        return {refreshToken: refreshToken, accessToken: accessToken}

    }

    async getAccessToken(id: number, username: string, refreshtoken: string) {

        const accesstoken =  this.jwtService.signAsync(
            {
                id,
                username,
                refreshtoken,
            },
            {
                secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
                expiresIn: '1d'
            }
        )
        return accesstoken

    }

    async getRefreshToken(id: number, username: string) {

        const refreshToken = await this.jwtService.signAsync(
            {
                id,
                username,
            },
            {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: '7d'
            }
        )
        return refreshToken;

    }

    async refresh (token: renewDto) {

        const user = await this.jwtService.verifyAsync(token.refreshToken);
        const accessToken = await this.getAccessToken(user.id, user.username, token.refreshToken)

        this.userService.updateUser(user.id, {accessToken: accessToken})

        return accessToken;

    }
    
    async logout(id: number){
        this.userService.updateUser(id, {accessToken: null, refreshToken: null})
    }
}
