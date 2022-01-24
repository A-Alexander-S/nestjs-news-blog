import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Новость такая то',
    description: 'Заголовок',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Текст новости',
    description: 'Описание новости',
  })
  description: string;

  @ApiProperty({
    example: 'kot.jpg',
    description: 'Загруженная картинка',
  })
  cover: string;
}