import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DeleteImgDto {
  @IsString()
  @IsNotEmpty()
  public_id: string;

  @IsString()
  @IsOptional()
  path?: string;
}
