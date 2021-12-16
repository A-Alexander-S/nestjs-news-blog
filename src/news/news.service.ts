import { Injectable } from '@nestjs/common';
import { Comment } from './comments/comments.service';

export interface News {
  id?: number;
  title: string;
  description: string;
  author: string;
  countView?: number;
  cover?: string;
  comments?: Comment[]
}

export interface NewsEdit {
  title?: string;
  description?: string;
  author?: string;
  countView?: number;
  cover?: string;
}

export function getRandomInt(min: number = 1, max: number = 999999): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

@Injectable()
export class NewsService {
  private readonly news: News[] = [
    {
      id: 1,
      title: 'Наша первая новость',
      description: 'Ура! Наша первая новость',
      author: 'Александр',
      countView: 12,
      cover: 'https://cdn.pixabay.com/photo/2018/07/13/10/20/kittens-3535404_960_720.jpg',
    }
  ];

  create(news: News): News {
    const id = getRandomInt(0, 99999);
    // console.log(id);
    const finalNews = {
      ...news,
      id: id
    };
    this.news.push(finalNews);
    return finalNews;
  }


  //Просмотреть
  find(id: News['id']): News | undefined {
    return this.news.find((news: News) => news.id === id);
  }

  getAll(): News[] {
    return this.news;
  }

  edit(id: number, news: NewsEdit): News | undefined {
    const indexEditeNews = this.news.findIndex((news: News) => news.id === id);
    if (indexEditeNews !== -1) {
      this.news[indexEditeNews] = {
        ...this.news[indexEditeNews],
        ...news
      };

      return this.news[indexEditeNews];
    }
    return undefined;
  }

  remove(id: News['id']): boolean {
    const indexRemoveNews = this.news.findIndex((news: News) => news.id === id);
    if (indexRemoveNews != -1) {
      this.news.splice(indexRemoveNews, 1);
      return true;
    }
    return false;
  }
}
