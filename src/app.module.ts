import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookSchema } from './schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://<admin>:<admin>@localhost:27017', { dbName: 'library' }),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
