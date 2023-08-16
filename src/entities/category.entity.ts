import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class CategotyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 50,
    nullable: false,
    default: 'empty',
  })
  name: string;
}
