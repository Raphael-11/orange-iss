import { IsString, IsNotEmpty, IsOptional, IsInt, IsDateString, IsArray, Min, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * DTO for creating a new offer
 */
export class CreateOfferDto {
  @ApiProperty({
    description: 'Title of the internship offer',
    example: 'Full Stack Developer Internship',
    minLength: 5,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(200)
  title: string;

  @ApiProperty({
    description: 'Detailed description of the internship',
    example: 'We are looking for a motivated full stack developer to join our team...',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'Specific requirements for candidates',
    example: 'Bachelor degree in Computer Science or related field',
  })
  @IsString()
  @IsOptional()
  requirements?: string;

  @ApiPropertyOptional({
    description: 'Required skills for the internship',
    example: ['JavaScript', 'TypeScript', 'Angular', 'NestJS', 'PostgreSQL'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  requiredSkills?: string[];

  @ApiProperty({
    description: 'Department offering the internship',
    example: 'Engineering',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  department: string;

  @ApiProperty({
    description: 'Duration in months',
    example: 6,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  duration: number;

  @ApiPropertyOptional({
    description: 'Start date of the internship',
    example: '2026-03-01',
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'End date of the internship',
    example: '2026-08-31',
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Application deadline',
    example: '2026-02-15',
  })
  @IsDateString()
  @IsOptional()
  applicationDeadline?: string;

  @ApiPropertyOptional({
    description: 'Number of available positions',
    example: 2,
    minimum: 1,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  numberOfPositions?: number;
}
