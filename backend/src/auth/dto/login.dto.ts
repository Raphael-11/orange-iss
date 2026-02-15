import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for user login
 */
export class LoginDto {
  @ApiProperty({
    description: 'Email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'SecurePass123!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
