import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment-dto';
import { EditCommentDto } from './dtos/edit-comment-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HelperFileLoader } from '../../utils/HelperFileLoader';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentsEntity } from './comments.entity';

const PATH_NEWS = '/news-static/';
HelperFileLoader.path = PATH_NEWS;

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @ApiOperation({ summary: 'Создание комментария' })
  // @ApiBody({
  //   type: {}
  // })
  @ApiResponse({
    status: 200,
    description: 'Комментарий успешно создан',
  })
  // @ApiResponse({ status: 200, description: 'Передан неверный идентификатор' })
  @Post('/api/:idNews')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('idNews', ParseIntPipe) idNews: number,
    @Body() comment: CreateCommentDto,
    @Req() req,
  ) {
    const jwtUserId = req.user.userId;
    return this.commentsService.create(idNews, comment.message, jwtUserId);
  }

  @ApiOperation({ summary: 'Редактирования комментария' })
  // @ApiBody({
  //   type: {}
  // })
  @ApiResponse({
    status: 200,
    description: 'Комментарий успешно изменен',
  })
  @Put('/api/:idComment')
  edit(
    @Param('idComment', ParseIntPipe) idComment: number,
    @Body() comment: EditCommentDto,
  ) {
    return this.commentsService.edit(idComment, comment);
  }

  @ApiOperation({ summary: 'Получение всех комментариев для определенной новости' })
  // @ApiBody({
  //   type: {}
  // })
  @ApiResponse({
    status: 200,
    description: 'Получение всех комментариев для определенной новости',
    // type: Promise<CommentsEntity[]>
  })
  @Get('/api/details/:idNews')
  get(@Param('idNews', ParseIntPipe) idNews: number) {
    return this.commentsService.findAll(idNews);
  }

  @ApiOperation({ summary: 'Удаление комментария под определенной новостью' })
  // @ApiBody({
  //   type: {}
  // })
  @ApiResponse({
    status: 200,
    description: 'Комментарий удален',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('/api/details/:idNews/:idComment')
  remove(@Param('idComment', ParseIntPipe) idComment: number, @Req() req) {
    const userId = req.user.id;
    return this.commentsService.remove(idComment, userId);
  }
}