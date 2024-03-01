import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteFolderDto {
  @IsString()
  @IsNotEmpty()
  path: string;
}
