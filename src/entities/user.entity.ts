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
  })
  username: string;

  @Column('varchar', {
    name: 'password',
    length: 10,
    nullable: false,
  })
  password: string;

  @Column('varchar', { name: 'refreshToken', nullable: true, select: false })
  refreshToken: string;

  @Column('varchar', { name: 'accessToken', nullable: true, select: false })
  accessToken: string;
}
