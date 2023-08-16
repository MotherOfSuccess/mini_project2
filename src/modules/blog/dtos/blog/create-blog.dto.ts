import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @Transform(({ value }) => value?.toString().trim())
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly categoryid: number;

  @IsNotEmpty()
  @Transform(({ value }) => value?.toString().trim())
  readonly content: string;

  @IsNumber()
  readonly image_id?: number;
}
