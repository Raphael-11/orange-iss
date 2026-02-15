import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for changing password
 */
export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password',
    example: 'oldPassword123',
  })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({
    description: 'New password - must be longer than 8 characters',
    example: 'newPassword123',
    minLength: 9,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(9, { message: 'Password must be longer than 8 characters' })
  newPassword: string;
}
