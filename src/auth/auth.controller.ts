import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Render,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Страница авторизации пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь авторизирован',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    const { access_token, id, role } = await this.authService.login(req.user);
    response.cookie('jwt', access_token, { httpOnly: true });
    response.cookie('userId', id);
    response.cookie('role', role);
    return access_token;
  }

  @ApiOperation({ summary: 'Страница авторизации пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь авторизирован',
  })
  @Get('login')
  @Render('auth/login')
  async renderLogin() {
    return { layout: 'auth', title: 'Авторизация' };
  }
}