import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export type TicketStatus = 'open' | 'in_progress' | 'closed';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  subject: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsEmail()
  customerEmail: string;

  @Column({ default: 'open' })
  @IsEnum(['open', 'in_progress', 'closed'])
  status: TicketStatus;

  @ManyToOne(() => User, (user) => user.tickets)
  assignedTo: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
