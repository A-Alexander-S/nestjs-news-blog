import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { CommentsModule } from './comments/comments.module';
import { MailModule } from '../mail/mail.module';
import { NewsEntity } from './news.entity';
import { UsersModule } from '../users/users.module';
import { RolesGuard } from '../auth/role/roles.guard';
import { AuthModule } from '../auth/auth.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService, MailService], // MailService
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),
    CommentsModule,
    //MailService,
    MailModule,
    UsersModule,
  ],
  exports: [TypeOrmModule.forFeature([NewsEntity]), NewsService],
})
export class NewsModule { }