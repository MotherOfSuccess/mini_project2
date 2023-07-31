import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';

import { UserEntity } from '../../models/user.entity';



@Controller('user')
export class UserController {
    constructor ( private userService: UserService ) {}

    @Get('all')
    findAll(){
        return this.userService.findAll();
    }

    @Post('add-user')
    addUser(@Body() user: UserEntity){
        return this.userService.addUser(user);
    }

    @Get('find/:username')
    findUser(@Param('username') username: string){
        return this.userService.findOneByUsername(username);
    }

    @Put('update/:id')
    updateUser(@Param('id') id: number, @Body() user: UserEntity){
        return this.userService.updateUser(id, user)
    }

    @Delete('delete/:id')
    deleteUser(@Param('id') id: number){
        return this.userService.deleteUser(id)
    }


}
