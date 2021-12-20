import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';

export class CreateCommentsDto {

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  author: string;
}