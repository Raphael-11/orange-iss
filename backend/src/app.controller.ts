import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

/**
 * Application controller
 * Handles health check and basic application endpoints
 */
@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Health check endpoint
   * Used to verify that the application is running and responding
   * @returns Object containing health status and timestamp
   */
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Application is healthy',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'ISS Orange API is running' },
        timestamp: { type: 'string', example: '2026-02-06T10:30:00.000Z' },
        environment: { type: 'string', example: 'development' },
      },
    },
  })
  getHealth(): { message: string; timestamp: string; environment: string } {
    return this.appService.getHealth();
  }

  /**
   * API version endpoint
   * Returns current API version information
   * @returns Object containing version details
   */
  @Get('version')
  @ApiOperation({ summary: 'Get API version' })
  @ApiResponse({
    status: 200,
    description: 'API version information',
    schema: {
      type: 'object',
      properties: {
        version: { type: 'string', example: '1.0.0' },
        name: { type: 'string', example: 'ISS Orange API' },
      },
    },
  })
  getVersion(): { version: string; name: string } {
    return this.appService.getVersion();
  }
}
