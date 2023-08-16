import { IsNotEmpty } from 'class-validator';
import { IsBiggerThan } from '../../../decorators/decorator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty({ message: 'Tên không được trống' })
  readonly name: string;

  @IsNotEmpty({ message: 'Giới tính không được trống' })
  @Transform(({ value }) => value?.toString().trim())
  readonly gender: string;

  @IsNotEmpty({ message: 'Tuổi không được trống' })
  @IsBiggerThan(18)
  readonly age: number;

  @IsNotEmpty({ message: 'Tài khoản không được trống' })
  @Transform(({ value }) => value?.toString().trim())
  readonly username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được trống' })
  @Transform(({ value }) => value?.toString().trim())
  readonly password: string;
}
