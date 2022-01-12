import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { CommentsEntity } from './comments/comments.entity';
// import { CategoriesEntity } from '../categories/categories.entity';
// import { CommentsEntity } from '../comments/comments.entity';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  cover: string;

  @ManyToOne(() => UsersEntity, (user) => user.news)
  user: UsersEntity;

  @OneToMany(() => CommentsEntity, (comments) => comments.news)
  comments: CommentsEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}