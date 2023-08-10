import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'
import { NotSuccessException } from '../../../exceptions/NotSuccessException';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}
    
    async findAll(): Promise<UserEntity[]>{
        const users = await this.userRepository.find()
        return users ?? null
    }

    async addUser(userAdd: CreateUserDto){

        const hash = await this.hashPassword(userAdd.password);
        const userTemp = await {...userAdd, password: hash}

        const userFind = await this.findOneByUsername(userAdd.username)

        if(!userFind){

            this.cacheManager.del("user_all")

            return await this.userRepository.save(userTemp);
        }

        return null

    }
    
    async findOneByUsername(username: string): Promise<UserEntity>{

        const condition: FindOneOptions<UserEntity> = {where: {username: username}}
        const user = await this.userRepository.findOne(condition);

        return user ?? null

    }

    async findOneByID(id: number): Promise<UserEntity>{

        const condition: FindOneOptions<UserEntity> = await {where: {id: id}}
        const user = await this.userRepository.findOne(condition);

        return user ?? null

    }

    async deleteUser(id: number){
        const user = await this.findOneByID(id)

        if(user){
            try{

                this.cacheManager.del("user_all")
                
                await this.userRepository.delete({id: id})
                
                return user
            }
            catch {
                throw new NotSuccessException("delete user", "This user is a foreign key on another table")
            }
        }

        return null
        
    }

    async updateUser(id: number, userUpdate: UpdateUserDto): Promise<UserEntity>{

        const user = await this.findOneByID(id)

        if(user){

            this.cacheManager.del("user_all")
            
            if(userUpdate.password != null){

                const hash = await this.hashPassword(userUpdate.password);
                const userTemp = await {...userUpdate, password: hash}

                await this.userRepository.update({id: id}, userTemp)
    
            }
            else{

                await this.userRepository.update({id: id}, userUpdate)
            }

            const userAfter = await this.findOneByID(id)

            return userAfter
        }
        
        return null
        

    }

    async hashPassword(password: string){

        if(password != ""){

            return await bcrypt.hash(password, 10);
        }

        return null

    }

}
