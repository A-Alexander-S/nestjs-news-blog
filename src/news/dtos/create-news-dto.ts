import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';

export class CreateNewsDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @Validate((o) => o.countView || o.countView === '')
  countView: number;

  cover: string;
}