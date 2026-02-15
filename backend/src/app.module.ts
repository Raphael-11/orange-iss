import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OffersModule } from './offers/offers.module';
import { RolesGuard } from './common/guards/roles.guard';

/**
 * Root application module
 * Configures database connection, environment variables, and imports feature modules
 */
@Module({
  imports: [
    // Configuration module for environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Make config available globally
      envFilePath: '.env',
      cache: true, // Cache environment variables
    }),

    // Database connection using TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USER', 'iss_user'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME', 'iss_orange'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') !== 'production', // Auto-sync in development only
        logging: configService.get('NODE_ENV') === 'development', // Enable logging in development
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        migrationsRun: false, // Run migrations manually
      }),
      inject: [ConfigService],
    }),

    // Feature modules
    AuthModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
