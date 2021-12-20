import { IsNotEmpty, IsString, Validate, IsNumber } from 'class-validator';

export class EditCommentDto {

  @IsString()
  @IsNotEmpty()
  @Validate((o) => o.message)
  message: string;

  @IsString()
  @IsNotEmpty()
  @Validate((o) => o.author)
  author: string;
}