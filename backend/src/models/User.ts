import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './Ticket';
import { Length , IsEmail } from 'class-validator';

export type UserRole = 'patient' | 'medical_support' | 'admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'enum',
    enum: ['patient', 'medical_support', 'admin'],
    default: 'patient',
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 15, default: 'N/A' })
  phoneNumber: string;

  @OneToMany(() => Ticket, (ticket) => ticket.assignedTo)
  tickets: Ticket[];
}
