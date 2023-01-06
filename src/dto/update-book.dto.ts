import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @MaxLength(50)
  @IsOptional()
  readonly name: string;

  @IsBoolean()
  @IsOptional()
  readonly onLibrary: boolean;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  readonly author?: string;
}
