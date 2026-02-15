import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

/**
 * Bootstrap function to initialize and start the NestJS application
 */
async function bootstrap() {
  // Create NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend communication
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Enable global validation pipe for request DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      transform: true, // Automatically transform payloads to DTO instances
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties
      transformOptions: {
        enableImplicitConversion: true, // Convert types automatically
      },
    }),
  );

  // Setup Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('ISS Orange API')
    .setDescription('Internship & PFE Management Platform API Documentation')
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
      'JWT-auth',
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('offers', 'Internship and PFE offers')
    .addTag('applications', 'Student applications')
    .addTag('ai-ranking', 'AI-powered candidate ranking')
    .addTag('evaluations', 'Performance evaluations')
    .addTag('notifications', 'Notification system')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Get port from environment or use default
  const port = process.env.PORT || 3000;

  // Start listening on specified port
  await app.listen(port);

  // Log application startup information
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`API Documentation: http://localhost:${port}/api/docs`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}

// Start application
bootstrap();
