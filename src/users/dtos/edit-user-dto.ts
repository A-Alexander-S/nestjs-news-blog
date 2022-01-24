import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { Role } from '../../auth/role/role.enum';

export class EditUserDto {

  @ApiProperty({
    example: 'Александр',
    description: 'Имя пользователя',
  })
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.firstName)
  firstName: string;

  @ApiProperty({
    example: 'lol@mail.com',
    description: 'Почта пользователя',
  })
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.email)
  email: string;

  @ApiProperty({
    example: '12345',
    description: 'Пароль пользователя',
  })
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.password)
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'Роль пользователя',
  })
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.roles)
  roles: Role;
}