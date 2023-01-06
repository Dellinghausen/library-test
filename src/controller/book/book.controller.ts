import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { UpdateBookDto } from 'src/dto/update-book.dto';
import { BookService } from '../../service/book/book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post()
  async createBook(@Res() response, @Body() createBookDto: CreateBookDto) {
    try {
      const newBook = await this.bookService.createBook(createBookDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Book has been created successfully',
        newBook,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Book not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateBook(@Res() response, @Param('id') bookId: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      const existingBook = await this.bookService.updateBook(bookId, updateBookDto);
      return response.status(HttpStatus.OK).json({
        message: 'Book has been successfully updated',
        existingBook,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getBooks(@Res() response) {
    try {
      const bookData = await this.bookService.getAllBooks();
      return response.status(HttpStatus.OK).json({
        message: 'All books data found successfully',
        bookData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getBook(@Res() response, @Param('id') bookId: string) {
    try {
      const existingBook = await this.bookService.getBook(bookId);
      return response.status(HttpStatus.OK).json({
        message: 'Book found successfully',
        existingBook,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteBook(@Res() response, @Param('id') bookId: string) {
    try {
      const deletedBook = await this.bookService.deleteBook(bookId);
      return response.status(HttpStatus.OK).json({
        message: 'Book deleted successfully',
        deletedBook,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
