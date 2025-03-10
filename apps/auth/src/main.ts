import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  if (!port) {
    throw new Error('PORT is not defined in the configuration');
  }
  await app.listen(port);
}
bootstrap();
