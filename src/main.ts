import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('library-svc');

  const config = new DocumentBuilder()
  .setTitle('Library-svc')
  .setDescription('The library API description')
  .setVersion('1.0')
  .addTag('library')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  const port = 1111;
  // const host = '127.0.0.1';
  const host = 'localhost';
  await app.listen(port, host);
  const baseUrl = `http://${host}:${port}`;
  console.log(`Application is running on: ${baseUrl}`);

  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
