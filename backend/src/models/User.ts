import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './Ticket';
import { Length , IsEmail } from 'class-validator';

export type UserRole = 'staff' | 'medical_support' | 'admin';

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
    enum: ['staff', 'medical_support', 'admin'],
    default: 'staff',
  })
  role: UserRole;

  @OneToMany(() => Ticket, (ticket) => ticket.assignedTo)
  tickets: Ticket[];
}
