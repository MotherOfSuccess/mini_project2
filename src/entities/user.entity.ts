import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 60 })
    name: string;

    @Column({ length: 10})
    gender: string;
    
    @Column()
    age: number;

    @Column({ length: 10, unique: true })
    username: string;

    @Column({ length: 10})
    password: string;

    @Column({ nullable: true, default: null })
    refreshToken: string;

    @Column({ nullable: true, default: null })
    accessToken: string;

}