import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Book {
  @Prop({ required: true })
  name: string;
  @Prop()
  author: number;
  @Prop()
  onLibrary: boolean;
}
export const BookSchema = SchemaFactory.createForClass(Book);
