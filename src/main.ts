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
  SwaggerModule.setup('api', app, swaggerConfig as OpenAPIObject);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      skipNullProperties: true,
    }),
  );
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
