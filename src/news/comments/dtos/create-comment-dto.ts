import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateCommentDto {

  @ApiProperty({
    example: 'Мне эта новость нравиться',
    description: 'Комментарий, который хотим оставить',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}