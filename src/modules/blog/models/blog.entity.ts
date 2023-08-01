import { CategotyEntity } from "../../category/models/category.entity";
import { User } from "../../user/dtos/user.dto";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/models/user.entity";

@Entity('blogs')
export class BlogEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('bigint', { name: 'id_author', nullable: false})
    id_author: number

    @Column({nullable: false})
    name: string
    
    @Column('bigint', {nullable: false})
    categoryid: number;

    @Column('text')
    content: string;

    @Column('varchar', {array: true})
    image: string[];

    @Column()
    datetime: string;

    @ManyToOne(() => UserEntity, (_user)=> _user.id)
    author: UserEntity;

    @ManyToOne(() => CategotyEntity, (_category)=> _category.id)
    category: CategotyEntity;
}