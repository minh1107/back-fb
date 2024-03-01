import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryProvider } from './cloudinary.provider';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
@Module({
  imports: [JwtModule],
  controllers: [UploadController],
  providers: [UploadService, CloudinaryProvider],
  exports: [UploadService, CloudinaryProvider],
})
export class UploadModule {}
