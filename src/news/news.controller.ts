import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Render,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { CreateNewsDto } from './dtos/create-news-dto';
import { EditNewsDto } from './dtos/edit-news-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from '../utils/HelperFileLoader';
import { MailService } from '../mail/mail.service';
import { NewsEntity } from './news.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/role/roles.decorator';
import { Role } from '../auth/role/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { KeyObject } from 'crypto';

const PATH_NEWS = '/news-static/';
HelperFileLoader.path = PATH_NEWS;

@ApiBearerAuth()
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
    private readonly mailService: MailService,
  ) { }

  @ApiOperation({ summary: 'Получение массива новостей' })
  @ApiResponse({
    status: 200,
    description: 'Массив новостей и title: { news: NewsEntity[], title: "Список новостей!" }',
    // type: NewsEntity[],
  })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('/all')
  @Render('news-list')
  async getAllView() {
    const news = await this.newsService.getAll();

    return { news, title: 'Список новостей!' };
  }

  @ApiOperation({ summary: 'Application/json' })
  @ApiResponse({
    status: 200,
    description: 'Массив новостей',
    type: NewsEntity,
  })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('/api/all')
  async getAll(): Promise<NewsEntity[]> {
    return this.newsService.getAll();
  }

  @ApiOperation({ summary: 'Страница детальной информации о новости' })
  @ApiResponse({
    status: 200,
    description: 'Информация о новости, пользователе, который её создал и комментарии к этой новости с информацией о пользователе, который их оставил',
    type: NewsEntity,
  })
  @ApiResponse({ status: 404, description: 'NOT_FOUND.' })
  @Get('/detail/:id')
  @Render('news-detail')
  async getDetailView(@Param('id', ParseIntPipe) id: number) {
    const news = await this.newsService.findById(id);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость была не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return { news };
  }

  @ApiOperation({ summary: 'Application/json' })
  @ApiResponse({
    status: 200,
    description: 'Информация о новости, пользователе, который её создал и комментарии к этой новости с информацией о пользователе, который их оставил',
    type: NewsEntity,
  })
  @ApiResponse({ status: 404, description: 'NOT_FOUND.' })
  @Get('/api/detail/:id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<NewsEntity> {
    const news = this.newsService.findById(id);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость была не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return news;
  }

  @ApiOperation({ summary: 'Страница создания новости' })
  @ApiResponse({
    status: 200,
    description: 'Форма создания новости',
    // type: HTMLDocument,
  })
  @ApiResponse({ status: 404, description: 'NOT_FOUND.' })
  @Get('create/new')
  @Render('create-news')
  async createView() {
    return {};
  }

  @ApiOperation({ summary: 'Создание новости' })
  @ApiBody({
    type: CreateNewsDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Новость успешно создалась',
    type: NewsEntity,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Post('/api')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
      fileFilter: HelperFileLoader.fileFilterImages,
    }),
  )
  async create(
    @Body() news: CreateNewsDto,
    @UploadedFile() cover,
    @Req() req,
  ): Promise<NewsEntity> {
    const userId = req.user.id;

    if (cover?.filename) {
      news.cover = PATH_NEWS + cover.filename;
    }

    const createdNews = await this.newsService.create(news, userId);

    return createdNews;
  }


  // @ApiOperation({ summary: 'Создание новости' })
  // @ApiBody({
  //   type: CreateNewsDto,
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Новость успешно создалась',
  //   type: NewsEntity,
  // })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('/api/:id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() news: EditNewsDto,
  ): Promise<NewsEntity> {
    const newsEditable = await this.newsService.edit(id, news);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость была не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return newsEditable;
  }


  @ApiOperation({ summary: 'Удаление новости' })
  @ApiResponse({
    status: 200,
    description: 'Новость успешно удалена',
  })
  @ApiResponse({ status: 200, description: 'Передан неверный идентификатор' })
  @Delete('/api/:id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const isRemoved = await this.newsService.remove(id);
    throw new HttpException(
      {
        status: HttpStatus.OK,
        error: isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор',
      },
      HttpStatus.OK,
    );
  }
}