import { Injectable } from '@nestjs/common';

export interface News {
  id?: number
  title: string
  description: string
  author: string
  countView?: number
}

export interface NewsEdit {
  title?: string
  description?: string
  author?: string
  countView?: number
}

function getRandomInt(min: number, max: number): number {
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
    }
  ];

  create(news: News): News {
    const id = getRandomInt(0, 99999);
    console.log(id);
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
