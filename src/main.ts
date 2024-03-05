import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { load } from 'js-yaml';
import { readFile } from 'fs/promises';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = load(await readFile('doc/api.yaml', 'utf8'));
  SwaggerModule.setup('doc', app, swaggerConfig as OpenAPIObject);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => `Server started on port = ${PORT}`);
}
bootstrap();
