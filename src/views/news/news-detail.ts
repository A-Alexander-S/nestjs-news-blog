import { News } from '../../news/news.service';
import { Comment } from '../../news/comments/comments.service';

export function renderNewsDetail(news: News, comment: Comment[]): string {
  return `
  <div class="container">
    <img src="${news.cover}" alt="">
    <h1>${news.title}</h1>
    <div>${news.description}</div>
    <div class="text-muted">Автор:${news.author}</div>
    ${comment ? renderNewsComments(comment) : 'Нет комментариев'}
  </div>
  
  `;
}

function renderNewsComments(comments: Comment[]): string {
  let html = '';
  for (const comment of comments) {
    html += `
    <div class="row">
      <div class="col-lg-2">
        <div class="rounded-lg" style="background:#ccc;width:75px;height:75px;"></div>
      </div>
      <div class="col-lg-8">
        <div >${comment.author}</div>
        <div >${comment.message}</div>
      </div>
    </div>
    `;
  }
  return html;
}
