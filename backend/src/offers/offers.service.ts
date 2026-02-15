import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer, OfferStatus } from './entities/offer.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../common/enums';
import { CreateOfferDto, UpdateOfferDto, ApproveOfferDto } from './dto';

/**
 * Service for managing internship offers
 */
@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  /**
   * Create a new offer
   * Only DEPARTMENT_CHIEF can create offers
   */
  async create(createOfferDto: CreateOfferDto, user: User): Promise<Offer> {
    if (user.role !== UserRole.DEPARTMENT_CHIEF) {
      throw new ForbiddenException('Only department chiefs can create offers');
    }

    const offer = this.offerRepository.create({
      ...createOfferDto,
      createdById: user.id,
      status: OfferStatus.DRAFT,
    });

    return this.offerRepository.save(offer);
  }

  /**
   * Get all offers with optional filtering
   */
  async findAll(filters?: {
    status?: OfferStatus;
    department?: string;
    createdById?: string;
  }): Promise<Offer[]> {
    const query = this.offerRepository.createQueryBuilder('offer')
      .leftJoinAndSelect('offer.createdBy', 'createdBy')
      .leftJoinAndSelect('offer.approvedBy', 'approvedBy');

    if (filters?.status) {
      query.andWhere('offer.status = :status', { status: filters.status });
    }

    if (filters?.department) {
      query.andWhere('offer.department = :department', { department: filters.department });
    }

    if (filters?.createdById) {
      query.andWhere('offer.createdById = :createdById', { createdById: filters.createdById });
    }

    return query.orderBy('offer.createdAt', 'DESC').getMany();
  }

  /**
   * Get offers visible to students (approved and published)
   */
  async findPublished(): Promise<Offer[]> {
    return this.offerRepository.find({
      where: { status: OfferStatus.PUBLISHED },
      relations: ['createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get a single offer by ID
   */
  async findOne(id: string): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['createdBy', 'approvedBy', 'applications'],
    });

    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }

    return offer;
  }

  /**
   * Update an offer
   * Only the creator or HR can update
   */
  async update(id: string, updateOfferDto: UpdateOfferDto, user: User): Promise<Offer> {
    const offer = await this.findOne(id);

    // Only creator can update draft offers
    if (offer.status === OfferStatus.DRAFT && offer.createdById !== user.id) {
      throw new ForbiddenException('You can only update your own draft offers');
    }

    // HR can update approved offers
    if (offer.status !== OfferStatus.DRAFT && user.role !== UserRole.HR) {
      throw new ForbiddenException('Only HR can update approved offers');
    }

    Object.assign(offer, updateOfferDto);
    return this.offerRepository.save(offer);
  }

  /**
   * Submit offer for approval
   * Changes status from DRAFT to PENDING_APPROVAL
   */
  async submitForApproval(id: string, user: User): Promise<Offer> {
    const offer = await this.findOne(id);

    if (offer.createdById !== user.id) {
      throw new ForbiddenException('You can only submit your own offers');
    }

    if (offer.status !== OfferStatus.DRAFT) {
      throw new BadRequestException('Only draft offers can be submitted for approval');
    }

    offer.status = OfferStatus.PENDING_APPROVAL;
    return this.offerRepository.save(offer);
  }

  /**
   * Approve or reject an offer
   * Only HR can approve/reject offers
   */
  async approveOffer(id: string, approveOfferDto: ApproveOfferDto, user: User): Promise<Offer> {
    if (user.role !== UserRole.HR) {
      throw new ForbiddenException('Only HR can approve or reject offers');
    }

    const offer = await this.findOne(id);

    if (offer.status !== OfferStatus.PENDING_APPROVAL) {
      throw new BadRequestException('Only pending offers can be approved or rejected');
    }

    if (approveOfferDto.approved) {
      offer.status = OfferStatus.APPROVED;
      offer.approvedById = user.id;
      offer.approvedAt = new Date();
      offer.rejectionReason = null;
    } else {
      if (!approveOfferDto.rejectionReason) {
        throw new BadRequestException('Rejection reason is required when rejecting an offer');
      }
      offer.status = OfferStatus.DRAFT;
      offer.rejectionReason = approveOfferDto.rejectionReason;
    }

    return this.offerRepository.save(offer);
  }

  /**
   * Publish an approved offer
   * Only HR can publish offers
   */
  async publish(id: string, user: User): Promise<Offer> {
    if (user.role !== UserRole.HR) {
      throw new ForbiddenException('Only HR can publish offers');
    }

    const offer = await this.findOne(id);

    if (offer.status !== OfferStatus.APPROVED) {
      throw new BadRequestException('Only approved offers can be published');
    }

    offer.status = OfferStatus.PUBLISHED;
    return this.offerRepository.save(offer);
  }

  /**
   * Close an offer
   * HR or creator can close offers
   */
  async close(id: string, user: User): Promise<Offer> {
    const offer = await this.findOne(id);

    if (user.role !== UserRole.HR && offer.createdById !== user.id) {
      throw new ForbiddenException('Only HR or the offer creator can close offers');
    }

    if (offer.status === OfferStatus.CLOSED || offer.status === OfferStatus.CANCELLED) {
      throw new BadRequestException('Offer is already closed or cancelled');
    }

    offer.status = OfferStatus.CLOSED;
    return this.offerRepository.save(offer);
  }

  /**
   * Cancel an offer
   * Only the creator can cancel draft offers
   */
  async cancel(id: string, user: User): Promise<void> {
    const offer = await this.findOne(id);

    if (offer.createdById !== user.id && user.role !== UserRole.HR) {
      throw new ForbiddenException('You can only cancel your own offers');
    }

    await this.offerRepository.remove(offer);
  }
}
