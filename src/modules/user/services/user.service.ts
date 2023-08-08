import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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

        const userFind = await this.findOneByUsername(userAdd.username)

        if(!userFind){

            this.cacheManager.del("user_all")

            return await this.userRepository.save(userTemp);
        }

        throw new ForbiddenException()

    }
    
    async findOneByUsername(username: string): Promise<UserEntity>{

        const condition: FindOneOptions<UserEntity> = {where: {username: username}}
        const user = await this.userRepository.findOne(condition);

        if(user){

            return user;
        }

        return null

    }

    async findOneByID(id: number): Promise<UserEntity>{

        const condition: FindOneOptions<UserEntity> = await {where: {id: id}}
        const user = await this.userRepository.findOne(condition);

        if(user){

            return await user;
        }

        throw new NotFoundException("User is not found")

    }

    async deleteUser(id: number){
        const user = await this.findOneByID(id)

        if(user){

            this.cacheManager.del("user_all")
            
            return await this.userRepository.delete({id: id})
        }

        throw new NotFoundException("User not found")
        
    }

    async updateUser(id: number, userUpdate: UpdateUserDto): Promise<UpdateResult>{

        const user = await this.findOneByID(id)

        if(user){

            this.cacheManager.del("user_all")
            
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
