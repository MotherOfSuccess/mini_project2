import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.interface';
import { UserEntity } from '../../models/user.entity';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
    constructor ( private userService: UserService ) {}

    @Post('add-user')
    createUser(@Body() user: User){
        return this.userService.create(user)
    }
}
