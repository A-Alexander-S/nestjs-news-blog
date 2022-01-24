import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { CommentsEntity } from './comments/comments.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('news')
export class NewsEntity {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор новости',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Новость про котов',
    description: 'Заголовок новости',
  })
  @Column('text')
  title: string;

  @ApiProperty({
    example: 'Коты классные и милые...',
    description: 'Описание новости',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    example:
      'http://localhost:3000/news-static/bebbcfe4-e111-406b-8653-9840bfcb561c.PNG',
    description: 'Обложка новости',
  })
  @Column('text', { nullable: true })
  cover: string;

  @ApiProperty({
    example: {
      "id": 1,
      "firstName": "Alexander A.",
      "email": "lol@mail.ru",
      "password": "$2b$10$uW8MWJ2Bschre8zuGErlb.IDQSXSbK0.ZeHx6yB.8jyO8Cxo/BViG",
      "roles": "user",
      "createdAt": "2022-01-19T13:00:06.777Z",
      "updateAt": "2022-01-19T13:00:06.777Z"
    },
    description: 'Информация о пользователе',
  })
  @ManyToOne(() => UsersEntity, (user) => user.news)
  user: UsersEntity;

  @ApiProperty({
    example: [
      {
        "id": 17,
        "message": "12345",
        "createAt": "2022-01-24T09:05:24.615Z",
        "updateAt": "2022-01-24T09:05:24.615Z",
        "user": {
          "id": 1,
          "firstName": "Alexander A.",
          "email": "lol@mail.ru",
          "password": "$2b$10$uW8MWJ2Bschre8zuGErlb.IDQSXSbK0.ZeHx6yB.8jyO8Cxo/BViG",
          "roles": "user",
          "createdAt": "2022-01-19T13:00:06.777Z",
          "updateAt": "2022-01-19T13:00:06.777Z"
        }
      },
      {
        "id": 19,
        "message": "Test comment\n",
        "createAt": "2022-01-24T11:42:12.824Z",
        "updateAt": "2022-01-24T11:42:12.824Z",
        "user": {
          "id": 1,
          "firstName": "Alexander A.",
          "email": "lol@mail.ru",
          "password": "$2b$10$uW8MWJ2Bschre8zuGErlb.IDQSXSbK0.ZeHx6yB.8jyO8Cxo/BViG",
          "roles": "user",
          "createdAt": "2022-01-19T13:00:06.777Z",
          "updateAt": "2022-01-19T13:00:06.777Z"
        }
      }
    ],
    description: 'Массив комментариев',
  })
  @OneToMany(() => CommentsEntity, (comments) => comments.news)
  comments: CommentsEntity[];

  @ApiProperty({
    example: '2022-01-20T06:06:46.978Z',
    description: 'Дата создания новости',
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    example: '2022-01-20T06:06:46.978Z',
    description: 'Дата редактирования новости',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}