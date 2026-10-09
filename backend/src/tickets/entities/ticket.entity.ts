// External Imports
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Relation } from "typeorm";

// Internal Imports
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

  @Column()
  userId: number;

  @ManyToOne(() => Event, (event) => event.tickets, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "eventId" })
  event: Relation<Event>;

  @ManyToOne(() => User, (user) => user.tickets, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "userId" })
  user: Relation<User>;
}
