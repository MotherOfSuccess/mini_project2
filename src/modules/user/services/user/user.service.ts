import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../../models/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { User } from '../../dtos/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}
    
    async findAll(): Promise<UserEntity[]>{

        return await this.userRepository.find();

    }

    async addUser(userAdd: CreateUserDto){

        const hash = await this.hashPassword(userAdd.password);
        const userTemp = await {...userAdd, password: hash}

        return await this.userRepository.save(userTemp);

    }
    
    async findOneByUsername(username: string): Promise<UserEntity>{

        const condition: FindOneOptions<UserEntity> = {where: {username: username}}
        const user = await this.userRepository.findOne(condition);

        return user;

    }

    async findOneByID(id: number): Promise<UserEntity>{

        const condition: FindOneOptions<UserEntity> = {where: {id: id}}
        const user = await this.userRepository.findOne(condition);

        return user;

    }

    async deleteUser(id: number){
        return await this.userRepository.delete({id: id})
    }

    async updateUser(id: number, user: UpdateUserDto): Promise<UpdateResult>{

        if(user.password != null){

            const hash = await this.hashPassword(user.password);
            const userTemp = await {...user, password: hash}

            return await this.userRepository.update({id: id}, userTemp)

        }

        return await this.userRepository.update({id: id}, user)

    }

    async hashPassword(password: string){

        return await bcrypt.hash(password, 10);

    }

}
