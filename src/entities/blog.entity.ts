import { CategotyEntity } from './category.entity';
import { ImageEntity } from './image.entity';
import { UserEntity } from './user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('blogs')
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer', { name: 'id_author', nullable: false, default: -1 })
  id_author: number;

  @Column('varchar', {
    name: 'name',
    length: 100,
    nullable: false,
    default: 'empty',
  })
  name: string;

  @Column('integer', { name: 'categoryid', nullable: false, default: -1 })
  categoryid: number;

  @Column('text', { name: 'content', nullable: false, default: 'empty' })
  content: string;

  @Column('bigint', { name: 'image_id', nullable: false, default: -1 })
  image_id: number;

  @Column()
  datetime: Date;

  @ManyToOne(() => CategotyEntity, (_category) => _category.id)
  @JoinColumn({ name: 'categoryid', referencedColumnName: 'id' })
  category: CategotyEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'id_author', referencedColumnName: 'id' })
  author: UserEntity;

  @ManyToOne(() => ImageEntity, (image) => image.id)
  @JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
  image: ImageEntity;
}
