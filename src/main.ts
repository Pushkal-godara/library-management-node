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
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'access-token',
  )
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document, {
  swaggerOptions: {
    docExpansion: 'none', // This line ensures all docs are collapsed by default
    persistAuthorization: true, // This will persist authorization between page reloads
  },
});

  const port = 1111;
  // const host = '127.0.0.1';
  const host = 'localhost';
  await app.listen(port, host);
  const baseUrl = `http://${host}:${port}`;
  console.log(`Application is running on: ${baseUrl}`);

  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
