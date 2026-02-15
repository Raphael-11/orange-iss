import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from '../../common/enums';

/**
 * User entity
 * Base entity for all system users (Student, Department Chief, HR, Supervisor)
 * Contains common authentication and profile information
 */
@Entity('users')
export class User {
  /**
   * Unique identifier for the user
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * User email address - used for authentication
   * Must be unique across all users
   */
  @Column({ unique: true, length: 255 })
  email: string;

  /**
   * Hashed password
   * Never exposed in API responses due to Exclude decorator
   */
  @Exclude()
  @Column({ length: 255 })
  password: string;

  /**
   * User first name
   */
  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  /**
   * User last name
   */
  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  /**
   * User role in the system
   * Determines access permissions and available features
   */
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  /**
   * Account active status
   * Inactive accounts cannot login
   */
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  /**
   * Email verification status
   * Can be used for email verification flow
   */
  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean;

  /**
   * Last login timestamp
   * Tracks user activity
   */
  @Column({ name: 'last_login', type: 'timestamp', nullable: true })
  lastLogin: Date;

  /**
   * Account creation timestamp
   */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /**
   * Last update timestamp
   */
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
