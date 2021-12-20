import { IsNotEmpty, IsString, Validate, IsNumber } from 'class-validator';

export class EditNewsDto {

  @IsString()
  @IsNotEmpty()
  @Validate((o) => o.title)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Validate((o) => o.description)
  description: string;

  @IsString()
  @IsNotEmpty()
  @Validate((o) => o.author)
  author: string;

  @IsNumber()
  @IsNotEmpty()
  @Validate((o) => o.countView || o.countView === '')
  countView?: number;

  @Validate((o) => o.cover)
  cover: string;
}