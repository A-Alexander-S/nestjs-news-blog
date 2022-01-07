import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';

export class CreateNewsDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  userId: string;

  cover: string;
}