import { CategotyEntity } from "./category.entity";
import { ImageEntity } from "./image.entity";
import { UserEntity } from "./user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('blogs')
export class BlogEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column('integer', {name: 'id_author', nullable: false})
    id_author: number

    @Column('varchar', {name: 'name', length: 100, nullable: false})
    name: string

    @Column('integer', {name: 'categoryid', nullable: false})
    categoryid: number;

    @Column('text', {name: 'content', nullable: false})
    content: string;

    @Column('bigint', {name: 'image_id', array: true})
    image_id: number[];

    @Column()
    datetime: Date;

    @ManyToOne(() => CategotyEntity, (_category) => _category.id)
    @JoinColumn({ name:'categoryid', referencedColumnName: 'id' })
    category: CategotyEntity;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'id_author', referencedColumnName: 'id'})
    author: UserEntity;

}