import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guard/auth.guard';
import { DeleteFolderDto } from './dto/delete-folder';
import { DeleteImgDto } from './dto/delete-img.dto';
import { FolderDto } from './dto/folder.dto';
import { GetResourceFolderDto } from './dto/get-resource-folder.dto';
import { UploadService } from './upload.service';

@UseGuards(AuthGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('/single')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadSingleImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('path') path: string,
  ) {
    const { secure_url } = await this.uploadService.uploadFile(file, path);
    return { url: secure_url };
  }

  @Post('/multiple')
  @UseInterceptors(FilesInterceptor('files'))
  public async uploadMultipleImage(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('path') path: string,
  ) {
    const result = await this.uploadService.uploadFiles(files, path);
    return result;
  }

  @Delete('/delete')
  public async deleteImage(@Query() payload: DeleteImgDto) {
    const result = await this.uploadService.deleteFile(
      payload.public_id,
      payload.path,
    );
    return result;
  }

  @Post('/create-folder')
  public async createFolder(@Body() payload: FolderDto) {
    const result = await this.uploadService.createFolder(payload.name);
    return result;
  }

  @Delete('/delete-folder')
  public async deleteFolder(@Query() payload: DeleteFolderDto) {
    console.log(payload);
    const result = await this.uploadService.deleteFolder(payload.path);
    return result;
  }

  @Get('/get-folder')
  public async getFolder(@Query() payload: GetResourceFolderDto) {
    const result = await this.uploadService.getResoucesByFolder(payload.path);
    return result;
  }
}
