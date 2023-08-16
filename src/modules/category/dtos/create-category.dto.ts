import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @Transform(({ value }) => value?.toString().trim())
  readonly name: string;
}
