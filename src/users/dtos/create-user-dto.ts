import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../auth/role/role.enum';

export class CreateUserDto {

  @ApiProperty({
    example: 'Александр',
    description: 'Имя пользователя',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'lol@mail.com',
    description: 'Почта пользователя',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: '12345',
    description: 'Пароль пользователя',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'Роль пользователя',
  })
  @IsNotEmpty()
  @IsString()
  roles: Role;
}