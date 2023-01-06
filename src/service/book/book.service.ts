import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { UpdateBookDto } from 'src/dto/update-book.dto';
import { IBook } from 'src/interface/book.interface';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private bookModel: Model<IBook>) {}
  async createBook(createBookDto: CreateBookDto): Promise<IBook> {
    const newBook = await new this.bookModel(createBookDto);
    return newBook.save();
  }
  async updateBook(bookId: string, updateBookDto: UpdateBookDto): Promise<IBook> {
    let query = this.bookModel.findByIdAndUpdate(bookId, updateBookDto, { new: true });
    if (updateBookDto.name || updateBookDto.author) {
      query = query.where({ onLibrary: true });
    }
    const existingBook = await query;
    if (!existingBook) {
      throw new NotFoundException(`Book #${bookId} not found or can't updated!`);
    }
    return existingBook;
  }

  async rentBook(bookId: string): Promise<IBook> {
    const existingBook = await this.bookModel
      .findByIdAndUpdate(bookId, { onLibrary: false }, { new: false })
      .where({ onLibrary: true });

    if (!existingBook) {
      throw new NotFoundException(`Book #${bookId} not found on library!`);
    }
    return existingBook;
  }

  async getAllBooks(name?: string): Promise<IBook[]> {
    let query = this.bookModel.find();
    if (name) {
      query = query.where({ name: { $regex: name } });
    }
    const bookData = await query;
    if (!bookData || bookData.length == 0) {
      throw new NotFoundException('Books data not found!');
    }
    return bookData;
  }
  async getBook(bookId: string): Promise<IBook> {
    const existingBook = await this.bookModel.findById(bookId).exec();
    if (!existingBook) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }
    return existingBook;
  }
  async deleteBook(bookId: string): Promise<IBook> {
    const deletedBook = await this.bookModel.findByIdAndDelete(bookId).where({ onLibrary: true });
    if (!deletedBook) {
      throw new NotFoundException(`Book #${bookId} not found or can't deleted!`);
    }
    return deletedBook;
  }
}
