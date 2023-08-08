import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}
    
    async findAll(): Promise<UserEntity[]>{
        const users = await this.userRepository.find()
        if(users){
            return users
        }
        throw new NotFoundException("Users not found")

    }

    async addUser(userAdd: CreateUserDto){

        const hash = await this.hashPassword(userAdd.password);
        const userTemp = await {...userAdd, password: hash}

        return await this.userRepository.save(userTemp);

    }
    
    async findOneByUsername(username: string): Promise<UserEntity>{

        const condition: FindOneOptions<UserEntity> = {where: {username: username}}
        const user = await this.userRepository.findOne(condition);

        if(user){

            return user;
        }

        throw new NotFoundException("User not found")

    }

    async findOneByID(id: number): Promise<UserEntity>{

        const condition: FindOneOptions<UserEntity> = await {where: {id: id}}
        const user = await this.userRepository.findOne(condition);

        if(user){

            return await user;
        }

        throw new NotFoundException("User not found")

    }

    async deleteUser(id: number){
        const user = this.findOneByID(id)

        if(user){

            return await this.userRepository.delete({id: id})
        }

        throw new NotFoundException("User not found")
        
    }

    async updateUser(id: number, userUpdate: UpdateUserDto): Promise<UpdateResult>{

        const user = await this.findOneByID(id)

        if(user){

            if(userUpdate.password != null){

                const hash = await this.hashPassword(userUpdate.password);
                const userTemp = await {...userUpdate, password: hash}
    
                return await this.userRepository.update({id: id}, userTemp)
            }

            return await this.userRepository.update({id: id}, userUpdate)
        }
        
        throw new NotFoundException("User not found")
        

    }

    async hashPassword(password: string){

        if(password != ""){

            return await bcrypt.hash(password, 10);
        }

        throw "Password is empty"

    }

}
