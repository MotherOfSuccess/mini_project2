import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @IsNotEmpty({ message: 'Detination must not be empty' })
  destination: string;

  @IsNotEmpty({ message: 'Extension must not be empty' })
  extension: string;

  @IsNotEmpty({ message: 'Size must not be empty' })
  size: number;

  @IsOptional()
  status?: boolean;
}
