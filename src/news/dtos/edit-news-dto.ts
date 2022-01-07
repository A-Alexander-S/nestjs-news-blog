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

  @Validate((o) => o.cover)
  cover: string;
}