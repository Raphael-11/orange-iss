import { Injectable } from '@nestjs/common';

/**
 * Application service
 * Contains business logic for basic application functionality
 */
@Injectable()
export class AppService {
  /**
   * Health check service method
   * @returns Object with health status information
   */
  getHealth(): { message: string; timestamp: string; environment: string } {
    return {
      message: 'ISS Orange API is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    };
  }

  /**
   * Get API version information
   * @returns Object with version details
   */
  getVersion(): { version: string; name: string } {
    return {
      version: '1.0.0',
      name: 'ISS Orange API',
    };
  }
}
