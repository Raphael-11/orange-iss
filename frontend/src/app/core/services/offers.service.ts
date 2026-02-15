import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';

/**
 * Offer status enumeration
 * Matches backend OfferStatus enum
 */
export enum OfferStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED'
}

/**
 * Offer interface
 */
export interface Offer {
  id: string;
  title: string;
  description: string;
  requirements?: string;
  requiredSkills?: string[];
  department: string;
  duration: number;
  startDate?: string;
  endDate?: string;
  applicationDeadline?: string;
  numberOfPositions: number;
  status: OfferStatus;
  rejectionReason?: string | null;
  createdById: string;
  approvedById?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  approvedBy?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

/**
 * Create offer DTO
 */
export interface CreateOfferDto {
  title: string;
  description: string;
  requirements?: string;
  requiredSkills?: string[];
  department: string;
  duration: number;
  startDate?: string;
  endDate?: string;
  applicationDeadline?: string;
  numberOfPositions?: number;
}

/**
 * Update offer DTO
 */
export type UpdateOfferDto = Partial<CreateOfferDto>;

/**
 * Approve offer DTO
 */
export interface ApproveOfferDto {
  approved: boolean;
  rejectionReason?: string;
}

/**
 * Offers service
 * Handles internship offer operations
 */
@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private readonly api = inject(ApiService);

  /**
   * Get all published offers (for students)
   */
  getPublishedOffers(): Observable<Offer[]> {
    return this.api.get<Offer[]>('offers/published');
  }

  /**
   * Get all offers with optional filters
   */
  getAllOffers(params?: { status?: OfferStatus; department?: string }): Observable<Offer[]> {
    return this.api.get<Offer[]>('offers', params);
  }

  /**
   * Get single offer by ID
   */
  getOfferById(id: string): Observable<Offer> {
    return this.api.get<Offer>(`offers/${id}`);
  }

  /**
   * Create new offer (Department Chief only)
   */
  createOffer(data: CreateOfferDto): Observable<Offer> {
    return this.api.post<Offer>('offers', data);
  }

  /**
   * Update existing offer
   */
  updateOffer(id: string, data: UpdateOfferDto): Observable<Offer> {
    return this.api.patch<Offer>(`offers/${id}`, data);
  }

  /**
   * Submit offer for approval (Department Chief)
   */
  submitForApproval(id: string): Observable<Offer> {
    return this.api.post<Offer>(`offers/${id}/submit`, {});
  }

  /**
   * Approve or reject offer (HR only)
   */
  approveOffer(id: string, data: ApproveOfferDto): Observable<Offer> {
    return this.api.post<Offer>(`offers/${id}/approve`, data);
  }

  /**
   * Publish offer (HR only)
   */
  publishOffer(id: string): Observable<Offer> {
    return this.api.post<Offer>(`offers/${id}/publish`, {});
  }

  /**
   * Close offer
   */
  closeOffer(id: string): Observable<Offer> {
    return this.api.post<Offer>(`offers/${id}/close`, {});
  }

  /**
   * Delete offer
   */
  deleteOffer(id: string): Observable<void> {
    return this.api.delete<void>(`offers/${id}`);
  }
}
