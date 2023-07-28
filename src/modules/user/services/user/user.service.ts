import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../models/user.entity';
import { User } from '../../models/user.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userResposity: Repository<UserEntity>
    ) {}
    
    create(user: User) : Observable<User>{
        return from(this.userResposity.save(user))
    }

}
