import { CategotyEntity } from "./category.entity";
import { UserEntity } from "./user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('blogs')
export class BlogEntity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'id_author'})
    id_author: UserEntity

    @Column({nullable: false})
    name: string

    @ManyToOne(() => CategotyEntity)
    @JoinColumn({name: 'categoryid'})
    categoryid: CategotyEntity;

    @Column('text')
    content: string;

    @Column('varchar', {array: true})
    image: string[];

    @Column()
    datetime: string;

}