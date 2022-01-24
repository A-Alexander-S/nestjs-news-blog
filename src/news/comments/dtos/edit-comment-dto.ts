import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate, IsNumber } from 'class-validator';

export class EditCommentDto {

  @ApiProperty({
    example: 'Думаю в прошлый раз я погорячился',
    description: 'Изменение оставленного комментария',
  })
  @IsString()
  @IsNotEmpty()
  @Validate((o) => o.message)
  message: string;
}