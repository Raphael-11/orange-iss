import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Evaluation entity
 * Stores supervisor evaluations for interns
 */
@Entity('evaluations')
export class Evaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'intern_id' })
  intern: User;

  @Column({ name: 'intern_id' })
  internId: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'supervisor_id' })
  supervisor: User;

  @Column({ name: 'supervisor_id' })
  supervisorId: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  evaluationType: string; // 'mid-term', 'final', 'monthly', etc.

  @Column({ type: 'date' })
  evaluationDate: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  technicalSkillsScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  softSkillsScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  professionalismScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  initiativeScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  teamworkScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  overallScore: number;

  @Column({ type: 'text', nullable: true })
  strengths: string;

  @Column({ type: 'text', nullable: true })
  areasForImprovement: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'text', nullable: true })
  achievements: string;

  @Column({ type: 'text', nullable: true })
  recommendations: string;

  @Column({ type: 'boolean', default: false })
  isFinalized: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
