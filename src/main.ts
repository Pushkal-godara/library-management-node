import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as passport from 'passport';
// import { RbacSeeder } from './database/seeders/rbac.seeders';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  // const seeder = app.get(RbacSeeder);
  // await seeder.seed();
  
  app.setGlobalPrefix('library-svc');

  const config = new DocumentBuilder()
  .setTitle('Library-svc')
  .setDescription('The library API description')
  .setVersion('1.0')
  .addBearerAuth(       // This adds auth to Swagger UI
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    },
    'access_token',
  )
  .build();

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };

  app.enableCors(corsOptions);

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document, {
  swaggerOptions: {
    docExpansion: 'none', // This line ensures all docs are collapsed by default
    persistAuthorization: true, // This will persist authorization between page reloads
  },
});

  const port = 1111;
  const host = 'localhost';
  await app.listen(port, host);
  const baseUrl = `http://${host}:${port}`;
  console.log(`Application is running on: ${baseUrl}`);

  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
