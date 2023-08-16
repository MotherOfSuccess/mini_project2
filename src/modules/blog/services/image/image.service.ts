import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from '../../../../entities/image.entity';
import { Repository } from 'typeorm';
import { CreateImageDto } from '../../dtos/image/create-image.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { join } from 'path';
import * as fs from 'fs'
import { NotFoundException } from '../../../../exceptions/NotFoundException';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(ImageEntity) private readonly imageReposity: Repository<ImageEntity>
    ){}

    async findImageByID(id: number){

        const img =  await this.imageReposity.createQueryBuilder('image')
                        .where('image.id = :id', {id: id})
                        .getOne()

        return img
    }

    async uploadImage(image: CreateImageDto): Promise<ImageEntity>{
        const imageDB = await this.imageReposity.createQueryBuilder('image')
                .getMany()

        const nameImageTrue = imageDB.map((image) => {return image.name})
        if(nameImageTrue.includes(image.name)){
            return
        }
        return await this.imageReposity.save(image)
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async deleteImageTemp(): Promise<void>{
        console.log('Run delete')
        const imageStatusFalse = await this.imageReposity.createQueryBuilder('image')
                .where('status = :status', {status: false})
                .getMany()

        const imageStatusTrue = await this.imageReposity.createQueryBuilder('image')
                .where('status = :status', {status: true})
                .getMany()

        if(imageStatusFalse){
            
            imageStatusFalse.forEach((img) => {
                if(!imageStatusTrue.includes(img) && fs.existsSync(join(process.env.DIRECTORY_IMAGE, img.name))){

                    fs.unlinkSync(join(process.env.DIRECTORY_IMAGE, img.name))
                }
                
            })
        }

        await this.imageReposity.createQueryBuilder('images')
                    .delete()
                    .from(ImageEntity)
                    .where('status = :status', {status: false})
                    .execute()
        
    }

    async updateImageStatus(id: number){

        await console.log('Run update')

        const img = await this.findImageByID(id)
        
        if(img){
            await this.imageReposity.createQueryBuilder('images')
                    .update()
                    .set({status: true})
                    .where('id = :id', {id: id})
                    .execute()
        }

        else {
            throw new NotFoundException('image')
        }

    }
}
