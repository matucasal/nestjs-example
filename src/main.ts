import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Admin Panel API')
    .setDescription('The Admin Panel API description')
    .setVersion('1.0')
    .addTag('root')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'api_key', in: 'header' }, 'api_key')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
