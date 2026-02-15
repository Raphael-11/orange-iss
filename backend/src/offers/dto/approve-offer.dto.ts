import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for approving or rejecting an offer
 */
export class ApproveOfferDto {
  @ApiProperty({
    description: 'Whether to approve the offer',
    example: true,
  })
  @IsBoolean()
  approved: boolean;

  @ApiPropertyOptional({
    description: 'Reason for rejection (required if approved is false)',
    example: 'The position requirements need to be more specific',
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  rejectionReason?: string;
}
