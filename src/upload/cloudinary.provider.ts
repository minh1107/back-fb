import { ConfigModule, ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
export const CloudinaryProvider = {
  imports: [ConfigModule],
  inject: [ConfigService],
  provide: 'CLOUDINARY',
  useFactory: async (configService: ConfigService) => {
    return v2.config({
      cloud_name: configService.get('CLOUD_NAME'),
      api_key: configService.get('API_KEY'),
      api_secret: configService.get('SECRET_KEY'),
    });
  },
};
