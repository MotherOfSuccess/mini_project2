import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { validateExtension, validateFileName, validateSize } from '../utils';
import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../constant/enum/configuration.enum';

export const multerFactory = (configService: ConfigService) =>
  <MulterOptions>{
    storage: diskStorage({
      destination: configService.get(Configuration.DIRECTORY_IMAGE),
      filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
      },
    }),
    async fileFilter(req, file, callback) {
      const validExtension = await validateExtension(file, configService);
      const validSize = await validateSize(file, configService);
      const validateName = await validateFileName(file);

      if (validExtension instanceof HttpException) {
        return callback(validExtension, false);
      }

      if (validSize instanceof HttpException) {
        return callback(validSize, false);
      }

      if (validateName instanceof HttpException) {
        return callback(validateName, false);
      }

      callback(null, true);
    },
  };
