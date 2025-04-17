import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the port from the environment variable or default to 3001
  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
