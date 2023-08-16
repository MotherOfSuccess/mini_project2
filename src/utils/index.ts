import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppMiddleware } from '../middlewares';
import { NotSuccessException } from '../exceptions/NotSuccessException';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../constant/enum/configuration.enum';
import { NORMAL_ALPHABEL_REGEX, SPECIAL_ALPHABEL_REGEX } from '../constant';
import * as path from 'path';

export const applyMiddlewares = (consumer: MiddlewareConsumer) => {
  consumer
    .apply(AppMiddleware)
    .forRoutes(
      { path: 'blog/all', method: RequestMethod.GET },
      { path: 'blog/find/*', method: RequestMethod.GET },
      { path: 'category/all', method: RequestMethod.GET },
      { path: 'category/find/*', method: RequestMethod.GET },
      { path: 'user/all', method: RequestMethod.GET },
      { path: 'user/find/*', method: RequestMethod.GET },
    );
};

export const getKey = async (url: string) => {
  const arr = await url.split('/');

  arr.shift();

  const key = await arr.join('_');

  return key ?? null;
};

export const getRespone = (
  data: any,
  errorCode: any,
  message: string,
  errors?: string[],
) => {
  return {
    data: data,
    errorCode: errorCode,
    message: message,
    errors: errors ?? null,
  };
};

export const validateExtension = (file: any, configService: ConfigService) => {
  const extensionSafe = configService.get(
    Configuration.EXTENSION_AVAILABLE_IMAGE,
  );

  if (!extensionSafe.includes(file.mimetype)) {
    return new NotSuccessException('upload', 'Type of file is not available');
  }
};

export const validateSize = (file: any, configService: ConfigService) => {
  const size = file.size;
  const max_size = configService.get(Configuration.MAX_SIZE_IMAGE);
  if (size > max_size) {
    return new NotSuccessException('upload', 'File too large');
  }
};

export const validateFileName = (file: any) => {
  const name = path.parse(file.originalname).name;
  const normal_character = NORMAL_ALPHABEL_REGEX;
  const special_character = SPECIAL_ALPHABEL_REGEX;

  const validSpecial = special_character.test(name);
  const validNormal = normal_character.test(name);

  if (!validSpecial) {
    if (!validNormal) {
      return new NotSuccessException('upload', 'File name is not available');
    }
  } else {
    return new NotSuccessException('upload', 'File name is not available');
  }
};
