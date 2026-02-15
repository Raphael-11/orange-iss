import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Notification type enumeration
 */
export enum NotificationType {
  APPLICATION_SUBMITTED = 'APPLICATION_SUBMITTED',
  APPLICATION_REVIEWED = 'APPLICATION_REVIEWED',
  APPLICATION_ACCEPTED = 'APPLICATION_ACCEPTED',
  APPLICATION_REJECTED = 'APPLICATION_REJECTED',
  OFFER_APPROVED = 'OFFER_APPROVED',
  OFFER_REJECTED = 'OFFER_REJECTED',
  NEW_OFFER_PUBLISHED = 'NEW_OFFER_PUBLISHED',
  DEADLINE_REMINDER = 'DEADLINE_REMINDER',
  EVALUATION_SUBMITTED = 'EVALUATION_SUBMITTED',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
}

/**
 * Notification entity
 * Stores system notifications for users
 */
@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  actionUrl: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any; // Additional data related to the notification

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
