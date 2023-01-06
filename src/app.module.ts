import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookSchema } from './schemas/book.schema';
import { BookService } from './service/book/book.service';
import { BookController } from './controller/book/book.controller';
import { UserSchema } from './schemas/user.schema';
import { UsersService } from './service/users/users.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './controller/users/users.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    MongooseModule.forFeature([
      { name: 'Book', schema: BookSchema },
      { name: 'user', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [AppController, BookController, UsersController],
  providers: [AppService, BookService, UsersService],
})
export class AppModule {}
