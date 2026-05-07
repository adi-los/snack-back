import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MealsService } from './meals/meals.service';
import { mkdirSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  // Ensure uploads directory exists
  mkdirSync(join(process.cwd(), 'uploads'), { recursive: true });

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // Seed default meals on first boot
  const mealsService = app.get(MealsService);
  await mealsService.seed();

  const port = process.env.PORT ?? 8000;
  await app.listen(port);
  console.log(`🚀 Restaurant API running on http://localhost:${port}`);
}

bootstrap();
