import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums';

/**
 * DTO for user registration
 */
export class RegisterDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @ApiProperty({
    description: 'Email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password - must be longer than 8 characters',
    example: 'mypassword',
    minLength: 9,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(9, { message: 'Password must be longer than 8 characters' })
  password: string;

  // Note: Role is automatically set to STUDENT for public registration
  // Other roles (HR, DEPARTMENT_CHIEF, SUPERVISOR) are created directly in database
}
