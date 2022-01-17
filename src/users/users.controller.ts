import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Render, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dtos/create-user-dto';
import { EditUserDto } from './dtos/edit-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @Post('api')
  async create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get('edit-profile/:id')
  @Render('user/edit-profile')
  async renderEditProfile(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const _user = await this.usersService.findById(id);
    return _user;
  }

  @Patch('api')
  @UseGuards(JwtAuthGuard)
  async edit(@Body() user: EditUserDto, @Req() req) {
    const jwtUserId = req.user.userId;
    return this.usersService.edit(jwtUserId, user);
  }
}
