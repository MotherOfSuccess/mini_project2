import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class renewDto {
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty({ message: 'Token rỗng' })
  readonly refreshToken: string;
}
