import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateIf, IsNumber } from 'class-validator';

export class EditNewsDto {

  @ApiProperty({
    example: 'Это новый заголовок',
    description: 'Заголовок на который  хотим заменить существующий',
  })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.title)
  title: string;

  @ApiProperty({
    example: 'Изменение новости  в связи с получение дополнительной информации',
    description: 'Описание новости',
  })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.description)
  description: string;

  @ApiProperty({
    example: 'https://vypechka-online.ru/wp-content/uploads/2019/09/EQgJ4p77Aeo.jpg',
    description: 'Смена картинки для новости',
  })
  @ValidateIf((o) => o.cover)
  cover: string;
}