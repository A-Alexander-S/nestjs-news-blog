import { Controller, Param, Post, Body, Get, Delete, Put } from '@nestjs/common';
import { CommentsService, CommentEdit, Comment } from './comments.service';
import { CreateCommentsDto } from './dtos/create-comment-dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post('/api/:idNews')
  create(@Param('idNews') idNews: string, @Body() comment: CreateCommentsDto) {
    const idNewsInt = parseInt(idNews);
    return this.commentsService.create(idNewsInt, comment);
  }

  @Put('/api/:idNews/:idComment')
  edit(
    @Param('idNews') idNews: string,
    @Param('idComment') idComment: string,
    @Body() comment: CommentEdit
  ) {
    const idNewsInt = parseInt(idNews);
    const idCommentInt = parseInt(idComment);
    return this.commentsService.edit(idNewsInt, idCommentInt, comment);
  }

  @Get('/api/details/:idNews')
  get(@Param('idNews') idNews: string) {
    const idNewsInt = parseInt(idNews);
    return this.commentsService.find(idNewsInt);
  }

  @Delete('/api/details/:idNews/:idComment')
  removed(
    @Param('idNews') idNews: string,
    @Param('idComment') idComment: string
  ) {
    const idNewsInt = parseInt(idNews);
    const idCommentInt = parseInt(idComment);
    return this.commentsService.remove(idNewsInt, idCommentInt);
  }
}
