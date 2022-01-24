import {
  Body,
  Controller,
  Post,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Get,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { EditUserDto } from './dtos/edit-user-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }


  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь создан',
    type: CreateUserDto,
  })
  @Post('api')
  async create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }


  @ApiOperation({ summary: 'Страница редактирование профиля пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Профиль отредактирован',
    type: EditUserDto,
  })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  @Get('edit-profile/:id')
  @Render('user/edit-profile')
  async renderEditProfile(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const _user = await this.usersService.findById(id);
    if (!_user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Неверный идентификатор пользователя',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return _user;
  }

  @ApiOperation({ summary: 'Редактирование профиля пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Профиль отредактирован',
  })
  @Patch('api')
  @UseGuards(JwtAuthGuard)
  async edit(@Body() user: EditUserDto, @Req() req) {
    const jwtUserId = req.user.userId;
    return this.usersService.edit(jwtUserId, user);
  }
}