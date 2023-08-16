import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
    nullable: false,
    length: 60,
    default: 'empty',
  })
  name: string;

  @Column('varchar', {
    name: 'name',
    nullable: false,
    length: 10,
    default: 'empty',
  })
  gender: string;

  @Column('smallint', { name: 'age', nullable: false, default: -1 })
  age: number;

  @Column('varchar', {
    name: 'username',
    length: 10,
    unique: true,
    nullable: false,
    default: 'empty',
  })
  username: string;

  @Column('varchar', {
    name: 'password',
    length: 10,
    nullable: false,
    default: 'empty',
  })
  password: string;

  @Column('varchar', { name: 'refreshToken', nullable: true })
  refreshToken: string;

  @Column('varchar', { name: 'accessToken', nullable: true })
  accessToken: string;
}
