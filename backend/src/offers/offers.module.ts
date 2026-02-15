import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { Offer } from './entities/offer.entity';
import { RolesGuard } from '../common/guards/roles.guard';

/**
 * Module for managing internship offers
 */
@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  controllers: [OffersController],
  providers: [OffersService, RolesGuard],
  exports: [OffersService],
})
export class OffersModule {}
