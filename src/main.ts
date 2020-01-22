import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function initSwagger(app: NestFastifyApplication) {
  const options = new DocumentBuilder()
    .setTitle('Cashback API')
    .setDescription('APIs do Sistema Cashback')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Usuario')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  initSwagger(app);
  await app.listen(3000);
}

bootstrap();
