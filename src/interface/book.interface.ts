import { Document } from 'mongoose';
export interface IBook extends Document {
  readonly name: string;
  readonly author: string;
  readonly onLibrary: boolean;
}
