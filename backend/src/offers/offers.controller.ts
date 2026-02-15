import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request as NestRequest,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';
import { OffersService } from './offers.service';
import { CreateOfferDto, UpdateOfferDto, ApproveOfferDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { OfferStatus } from './entities/offer.entity';

/**
 * Controller for managing internship offers
 */
@ApiTags('Offers')
@Controller('offers')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  /**
   * Create a new offer (Department Chief only)
   */
  @Post()
  @Roles(UserRole.DEPARTMENT_CHIEF)
  @ApiOperation({ summary: 'Create a new internship offer' })
  @ApiResponse({ status: 201, description: 'Offer created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only department chiefs can create offers' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createOfferDto: CreateOfferDto, @NestRequest() req: Request & { user: any }) {
    return this.offersService.create(createOfferDto, req.user);
  }

  /**
   * Get all offers with optional filtering
   */
  @Get()
  @ApiOperation({ summary: 'Get all offers with optional filtering' })
  @ApiQuery({ name: 'status', enum: OfferStatus, required: false })
  @ApiQuery({ name: 'department', type: String, required: false })
  @ApiResponse({ status: 200, description: 'Offers retrieved successfully' })
  findAll(
    @Query('status') status?: OfferStatus,
    @Query('department') department?: string,
    @NestRequest() req?: Request & { user: any },
  ) {
    const filters: any = {};
    
    if (status) {
      filters.status = status;
    }
    
    if (department) {
      filters.department = department;
    }

    // Department chiefs only see their own offers (unless HR)
    if (req && req.user.role === UserRole.DEPARTMENT_CHIEF) {
      filters.createdById = req.user.id;
    }

    return this.offersService.findAll(filters);
  }

  /**
   * Get published offers (available to students)
   */
  @Get('published')
  @ApiOperation({ summary: 'Get all published offers available to students' })
  @ApiResponse({ status: 200, description: 'Published offers retrieved successfully' })
  findPublished() {
    return this.offersService.findPublished();
  }

  /**
   * Get a single offer by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get offer details by ID' })
  @ApiResponse({ status: 200, description: 'Offer retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }

  /**
   * Update an offer
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update an offer' })
  @ApiResponse({ status: 200, description: 'Offer updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  update(
    @Param('id') id: string,
    @Body() updateOfferDto: UpdateOfferDto,
    @NestRequest() req: Request & { user: any },
  ) {
    return this.offersService.update(id, updateOfferDto, req.user);
  }

  /**
   * Submit offer for approval
   */
  @Post(':id/submit')
  @Roles(UserRole.DEPARTMENT_CHIEF)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit offer for HR approval' })
  @ApiResponse({ status: 200, description: 'Offer submitted for approval' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  submitForApproval(@Param('id') id: string, @NestRequest() req: Request & { user: any }) {
    return this.offersService.submitForApproval(id, req.user);
  }

  /**
   * Approve or reject an offer (HR only)
   */
  @Post(':id/approve')
  @Roles(UserRole.HR)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve or reject an offer' })
  @ApiResponse({ status: 200, description: 'Offer approved or rejected' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only HR can approve offers' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  approveOffer(
    @Param('id') id: string,
    @Body() approveOfferDto: ApproveOfferDto,
    @NestRequest() req: Request & { user: any },
  ) {
    return this.offersService.approveOffer(id, approveOfferDto, req.user);
  }

  /**
   * Publish an approved offer (HR only)
   */
  @Post(':id/publish')
  @Roles(UserRole.HR)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Publish an approved offer' })
  @ApiResponse({ status: 200, description: 'Offer published successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only HR can publish offers' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  publish(@Param('id') id: string, @NestRequest() req: Request & { user: any }) {
    return this.offersService.publish(id, req.user);
  }

  /**
   * Close an offer
   */
  @Post(':id/close')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Close an offer' })
  @ApiResponse({ status: 200, description: 'Offer closed successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  close(@Param('id') id: string, @NestRequest() req: Request & { user: any }) {
    return this.offersService.close(id, req.user);
  }

  /**
   * Cancel/delete an offer
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an offer' })
  @ApiResponse({ status: 204, description: 'Offer deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  cancel(@Param('id') id: string, @NestRequest() req: Request & { user: any }) {
    return this.offersService.cancel(id, req.user);
  }
}
