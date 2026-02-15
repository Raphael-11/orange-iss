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
 * ParsedCV entity
 * Stores extracted information from CV parsing
 */
@Entity('parsed_cvs')
export class ParsedCV {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Application, (application) => application.parsedCV, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'application_id' })
  application: Application;

  @Column({ name: 'application_id' })
  applicationId: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  fullName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'simple-array', nullable: true })
  skills: string[];

  @Column({ type: 'simple-array', nullable: true })
  languages: string[];

  @Column({ type: 'jsonb', nullable: true })
  education: any; // Array of education objects

  @Column({ type: 'jsonb', nullable: true })
  experience: any; // Array of experience objects

  @Column({ type: 'jsonb', nullable: true })
  certifications: any; // Array of certification objects

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'text', nullable: true })
  rawText: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  fileType: string;

  @Column({ type: 'int', default: 0 })
  totalYearsOfExperience: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  highestDegree: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  fieldOfStudy: string;

  @Column({ type: 'boolean', default: true })
  parsingSuccessful: boolean;

  @Column({ type: 'text', nullable: true })
  parsingErrors: string;

  @CreateDateColumn()
  parsedAt: Date;
}
