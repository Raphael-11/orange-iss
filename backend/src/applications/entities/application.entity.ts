import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { ParsedCV } from './parsed-cv.entity';
import { AIRanking } from './ai-ranking.entity';

/**
 * Application status enumeration
 */
export enum ApplicationStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  SHORTLISTED = 'SHORTLISTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
}

/**
 * Application entity
 * Represents a student's application to an internship offer
 */
@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Offer, (offer) => offer.applications, { nullable: false })
  @JoinColumn({ name: 'offer_id' })
  offer: Offer;

  @Column({ name: 'offer_id' })
  offerId: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @Column({ type: 'varchar', length: 500, nullable: true })
  cvUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  motivationLetterUrl: string;

  @Column({ type: 'text', nullable: true })
  motivationLetter: string;

  @Column({ type: 'text', nullable: true })
  coverLetter: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'reviewed_by' })
  reviewedBy: User;

  @Column({ name: 'reviewed_by', nullable: true })
  reviewedById: string;

  @Column({ type: 'timestamp', nullable: true })
  reviewedAt: Date;

  @OneToOne(() => ParsedCV, (parsedCV) => parsedCV.application, { cascade: true })
  parsedCV: ParsedCV;

  @OneToOne(() => AIRanking, (ranking) => ranking.application, { cascade: true })
  aiRanking: AIRanking;

  @CreateDateColumn()
  appliedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
