// Imports
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { Event } from "../../events/entities/event.entity";
import { User } from "../../users/entities/user.entity";

// Entity Definition
@Entity("tickets")
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "Valid" })
  status: string;

  @Column()
  eventId: number;

  @ManyToOne(() => Event, (event) => event.tickets, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "eventId" })
  event: Relation<Event>;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.tickets, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "userId" })
  user: Relation<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
