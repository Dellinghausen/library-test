import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Book {
  @Prop({ required: true })
  name: string;
  @Prop()
  author: string;
  @Prop({ required: true })
  onLibrary: boolean;

  constructor(book?: Partial<Book>) {
    this.name = book?.name;
    this.author = book?.author;
    this.onLibrary = book?.onLibrary;
  }
}
export const BookSchema = SchemaFactory.createForClass(Book);
