import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT authentication guard
 * Protects routes by requiring valid JWT token
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
