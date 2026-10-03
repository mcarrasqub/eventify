// Imports
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';

// Entity Definition
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', default: 'user' })
  role: 'admin' | 'user';

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Relation<Ticket[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
