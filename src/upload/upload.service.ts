import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { CusError } from 'src/utils/error/CusError';
import { ErrorCode } from 'src/utils/error/error-code.enum';
import { ErrorMessage } from 'src/utils/error/errorMessage';

@Injectable()
export class UploadService {
  async uploadFile(
    file: Express.Multer.File,
    folderPath: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!file) {
      throw new CusError(
        ErrorCode.BAD_REQUEST,
        ErrorMessage.MISSING_FILE_WHEN_UPLOAD,
      );
    }
    return new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream(
          {
            folder: folderPath ? 'Default/' + folderPath : 'Default',
            resource_type: 'auto',
            unique_filename: true,
            use_filename: true,
            filename_override: file.originalname,
          },
          (error, result) => {
            if (error)
              return reject(new CusError(ErrorCode.BAD_REQUEST, error.message));
            resolve(result);
          },
        )
        .end(file.buffer);
    });
  }

  async uploadFiles(files: Express.Multer.File[], folder: string) {
    const urls = await Promise.all(
      files.map(async (file) => {
        const { secure_url } = await this.uploadFile(file, folder);
        return { url: secure_url };
      }),
    );
    return urls;
  }

  async deleteFile(public_id: string, folderPath: string) {
    const path = folderPath ? 'Default/' + folderPath : 'Default';
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(path + '/' + public_id, (error, result) => {
        if (error)
          return reject(new CusError(ErrorCode.BAD_REQUEST, error.message));
        resolve(result);
      });
    });
  }

  async createFolder(folder: string) {
    return new Promise((resolve, reject) => {
      v2.api.create_folder('Default/' + folder, (error, result) => {
        if (error)
          return reject(new CusError(ErrorCode.BAD_REQUEST, error.message));
        resolve(result);
      });
    });
  }

  async deleteFolder(path: string) {
    await v2.api
      .delete_resources_by_prefix('Default/' + path)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new CusError(ErrorCode.BAD_REQUEST, err.message);
      });
    return new Promise((resolve, reject) => {
      v2.api.delete_folder('Default/' + path, (error, result) => {
        if (error) {
          return reject(new CusError(ErrorCode.BAD_REQUEST, error.message));
        }
        resolve(result);
      });
    });
  }

  async getResoucesByFolder(path: string) {
    return new Promise((resolve, reject) => {
      v2.api.resources(
        {
          type: 'upload',
          prefix: 'Default/' + path,
        },
        (error, result) => {
          if (error)
            return reject(new CusError(ErrorCode.BAD_REQUEST, error.message));
          resolve(result);
        },
      );
    });
  }
}
