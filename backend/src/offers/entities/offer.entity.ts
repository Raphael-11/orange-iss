import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Application } from '../../applications/entities/application.entity';

/**
 * Offer status enumeration
 */
export enum OfferStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

/**
 * Offer entity
 * Represents internship or PFE opportunities created by department chiefs
 */
@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  requirements: string;

  @Column({ type: 'simple-array', nullable: true })
  requiredSkills: string[];

  @Column({ type: 'varchar', length: 100 })
  department: string;

  @Column({ type: 'int' })
  duration: number; // Duration in months

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'date', nullable: true })
  applicationDeadline: Date;

  @Column({ type: 'int', default: 1 })
  numberOfPositions: number;

  @Column({
    type: 'enum',
    enum: OfferStatus,
    default: OfferStatus.DRAFT,
  })
  status: OfferStatus;

  @Column({ type: 'text', nullable: true, default: null })
  rejectionReason: string | null;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column({ name: 'created_by' })
  createdById: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approvedBy: User;

  @Column({ name: 'approved_by', nullable: true })
  approvedById: string;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date;

  @OneToMany(() => Application, (application) => application.offer)
  applications: Application[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
