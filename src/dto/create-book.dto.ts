import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
export class CreateBookDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly name: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly onLibrary: boolean;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  readonly author?: string;
}
