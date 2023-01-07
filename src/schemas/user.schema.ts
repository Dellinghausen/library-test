import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  constructor(user?: Partial<User>) {
    this.username = user?.username;
    this.password = user?.password;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
