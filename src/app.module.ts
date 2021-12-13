import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';

@Module({
  imports: [NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }



// class Class1 {
//   getHello(): string {
//     return 'Hello'
//   }
// }

// class Class2 {
//   constructor(private readonly class1: Class1) { }
//   printMessage() {
//     return this.class1.getHello();
//   }
// }

// const class1 = new Class1();
// class1.getHello();
// const class2 = new Class2(class1);
