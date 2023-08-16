import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogEntity } from './blog.entity';

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 100,
    nullable: false,
    default: 'null',
  })
  name: string;

  @Column('varchar', {
    name: 'destination',
    length: 100,
    nullable: false,
    default: 'null',
  })
  destination: string;

  @Column('varchar', {
    name: 'extension',
    length: 10,
    nullable: false,
    default: 'null',
  })
  extension: string;

  @Column('integer', { name: 'size', nullable: false, default: 0 })
  size: number;

  @Column('boolean', { name: 'status', nullable: false, default: false })
  status: boolean;
}
