import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Application } from './application.entity';

/**
 * AIRanking entity
 * Stores AI-generated ranking and explanation for applications
 */
@Entity('ai_rankings')
export class AIRanking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Application, (application) => application.aiRanking, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'application_id' })
  application: Application;

  @Column({ name: 'application_id' })
  applicationId: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  overallScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  skillMatchScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  educationScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  experienceScore: number;

  @Column({ type: 'text' })
  explanation: string;

  @Column({ type: 'simple-array', nullable: true })
  matchedSkills: string[];

  @Column({ type: 'simple-array', nullable: true })
  missingSkills: string[];

  @Column({ type: 'jsonb', nullable: true })
  strengths: any; // Array of strength objects with descriptions

  @Column({ type: 'jsonb', nullable: true })
  weaknesses: any; // Array of weakness objects with descriptions

  @Column({ type: 'jsonb', nullable: true })
  detailedBreakdown: any; // Detailed scoring breakdown

  @Column({ type: 'varchar', length: 50, nullable: true })
  aiModelVersion: string;

  @Column({ type: 'boolean', default: true })
  rankingValid: boolean;

  @Column({ type: 'text', nullable: true })
  rankingErrors: string;

  @CreateDateColumn()
  rankedAt: Date;
}
