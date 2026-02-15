import { PartialType } from '@nestjs/swagger';
import { CreateOfferDto } from './create-offer.dto';

/**
 * DTO for updating an existing offer
 * All fields from CreateOfferDto are optional
 */
export class UpdateOfferDto extends PartialType(CreateOfferDto) {}
