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

    @Column({ length: 20, unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ length: 100, nullable: true, default: null })
    refreshToken: string;

    @Column({ length: 100, nullable: true, default: null })
    accessToken: string;

}