import { Transform } from 'class-transformer';
import { IsBiggerThan } from '../../../../decorators/decorator';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateBlogDto {
  @IsOptional()
  @Transform(({ value }) => value?.toString().trim())
  readonly name?: string;

  @IsOptional()
  @IsBiggerThan(0)
  readonly categoryid?: number;

  @IsOptional()
  @Transform(({ value }) => value?.toString().trim())
  readonly content?: string;

  @IsOptional()
  @IsNumber()
  readonly image_id?: number;
}
