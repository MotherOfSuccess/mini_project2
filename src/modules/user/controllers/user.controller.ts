import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AppInterceptor } from '../../../interceptors';


@UseInterceptors(AppInterceptor)
@Controller('user')
export class UserController {
    constructor ( private userService: UserService ) {}

    @Get('all')
    findAll(){
        return this.userService.findAll();
    }

    @Post('add-user')
    addUser(@Body() user: CreateUserDto){
        return this.userService.addUser(user);
    }

    @Get('find/:username')
    findUser(@Param('username') username: string){
        return this.userService.findOneByUsername(username);
    }

    @Put('update/:id')
    updateUser(@Param('id') id: number, @Body() user: UpdateUserDto){
        return this.userService.updateUser(id, user)
    }

    @Delete('delete/:id')
    deleteUser(@Param('id') id: number){
        return this.userService.deleteUser(id)
    }


}
