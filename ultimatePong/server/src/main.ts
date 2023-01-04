import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//   Cors activé car la connexion database s'effectue depuis le browser
  await app.listen(3000);
}
bootstrap();
