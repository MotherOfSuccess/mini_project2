import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { LoginDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt' 
import { renewDto } from '../dtos/renew.dto';
import { UpdateResult } from 'typeorm';
import { UnauthorizedException } from '../../../exceptions/UnauthorizedException';
import { NotFoundException } from '../../../exceptions/NotFoundException';
import { UserEntity } from 'src/entities/user.entity';


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
            throw new UnauthorizedException("login", "Username or Password is wrong");
        }

        const isMatch = await bcrypt.compare(userLogin.password, user.password)

        if(!isMatch){
            throw new UnauthorizedException("login", "Username or Password is wrong");
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
        try {

            const user = await this.jwtService.verifyAsync(token.refreshToken);
            
            if(user){
                
                const accessToken = await this.getAccessToken(user.id, user.username, token.refreshToken)
    
                await this.userService.updateUser(user.id, {accessToken: accessToken})
    
                return accessToken;
    
            } else {

                throw new UnauthorizedException("Token", "Jwt malformed")
            }
        } catch {

            throw new UnauthorizedException("Token", "Jwt malformed")
        }

    }
    
    async logout(id: number): Promise<any>{

        const user = this.userService.findOneByID(id)
        
        if(user){

            this.userService.updateUser(id, {accessToken: null, refreshToken: null})

            const userAfter = await this.userService.findOneByID(id)

            return userAfter

        } else {
            throw new NotFoundException("User")
        }

    }


}
