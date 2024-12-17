import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

export type TicketStatus = 'open' | 'in_progress' | 'closed';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: ['open', 'in_progress', 'closed'],
    default: 'open',
  })
  status: TicketStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.createdTickets, { nullable: true })
  createdBy: User;

  // Optional: Assigned support staff
  @ManyToOne(() => User, (user) => user.assignedTickets, { nullable: true })
  assignedTo: User | null;

  @Column()
  patientPhoneNumber: string;

  @Column({ nullable: true })
  patientEmail: string;

  @Column({ default: false })
  emailSent: boolean;

  @Column({ type: 'timestamp', nullable: true })
  emailSentAt: Date | null;

  @Column({ default: false })
  smsSent: boolean;

  @Column({ type: 'timestamp', nullable: true })
  smsSentAt: Date | null;
  
}
