import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura os pipes globais de validação
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Transforma dados automaticamente para o tipo esperado
    whitelist: true, // Remove propriedades que não estão no DTO
  }));

  // Habilita CORS para permitir requisições de diferentes domínios
  app.enableCors();

  // Inicia a aplicação na porta especificada ou na 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
