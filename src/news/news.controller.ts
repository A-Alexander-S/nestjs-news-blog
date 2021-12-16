import { Controller, Get, Param, Post, Body, Delete, Put, Res } from '@nestjs/common';
import { News, NewsService, NewsEdit } from './news.service';
import { CommentsService } from './comments/comments.service';
import { renderNewsAll } from '../views/news/news-all';
import { renderTemplate } from '../views/template';
import { renderNewsDetail } from '../views/news/news-detail';

@Controller('/news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService
  ) { }

  @Get('/api/detail/:id')
  get(@Param('id') id: string): News {
    const idInt = parseInt(id);
    const news = this.newsService.find(idInt);
    const comments = this.commentsService.find(idInt);

    return {
      ...news,
      comments
    }
  }

  @Get('/api/all')
  getAll(): News[] {
    const news = this.newsService.getAll();
    return news;
  }

  @Get('/all')
  getAllView() {
    const news = this.newsService.getAll();
    const contest = renderNewsAll(news);
    return renderTemplate(contest, {
      title: "Список новостей",
      description: "Самые крутые новости на свете!"
    });
  }

  @Get('/detail/:id')
  getDetailView(@Param('id') id: string) {
    const inInt = parseInt(id);
    const news = this.newsService.find(inInt);
    const comments = this.commentsService.find(inInt);
    const contest = renderNewsDetail(news, comments);
    return renderTemplate(contest, {
      title: news.title,
      description: news.description
    });
  }

  @Post('/api')
  create(@Body() news: News): News {
    return this.newsService.create(news);
  }

  @Put('/api/:id')
  edit(@Param('id') id: string, @Body() news: NewsEdit): News {
    const idInt = parseInt(id);
    return this.newsService.edit(idInt, news);
  }

  @Delete('/api/:id')
  remove(@Param('id') id: string): string {
    const idInt = parseInt(id);
    const isRemoved = this.newsService.remove(idInt);
    return isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор';
  }
}
