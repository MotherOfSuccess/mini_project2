import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AppInterceptor } from '../../../interceptors';
import { getRespone } from '../../../utils';
import { NotFoundException } from '../../../exceptions/NotFoundException';
import { NotSuccessException } from '../../../exceptions/NotSuccessException';



@UseInterceptors(AppInterceptor)
@Controller('user')
export class UserController {
    constructor ( private userService: UserService ) {}

    @Get('all')
    async findAll(){
        const users = await this.userService.findAll();
        if(users){
            return getRespone(users, HttpStatus.OK, "Success")
        }
        throw new NotFoundException('All Users')
    }

    @Post('add-user')
    async addUser(@Body() user: CreateUserDto){
        const temp = await this.userService.addUser(user);
        if(temp){
             return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotSuccessException('add user')
    }

    @Get('find/:username')
    async findUser(@Param('username') username: string){
        const temp = await this.userService.findOneByUsername(username);
        if(temp){
            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotFoundException('username')
    }

    @Put('update/:id')
    async updateUser(@Param('id') id: number, @Body() user: UpdateUserDto){
        const temp = await this.userService.updateUser(id, user)
        if(temp){
            return getRespone(temp, HttpStatus.OK, "Success")
       }
       throw new NotSuccessException("update user", "Not found user to update")
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: number){
        const temp = await this.userService.deleteUser(id)
        if(temp){
            return getRespone(temp, HttpStatus.OK, "Success")
        }
        throw new NotSuccessException("delete user", "Not found user to delete")
    }


}
