import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * CurrentUser decorator
 * Extracts the authenticated user from the request
 * Used in route handlers to access the current user
 * @example getCurrentUser(@CurrentUser() user: User)
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
