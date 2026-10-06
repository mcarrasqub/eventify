// Imports
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { Ticket } from "../../tickets/entities/ticket.entity";
import { Venue } from "../../venues/entities/venue.entity";

// Entity Definition
@Entity("events")
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageURL: string;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column()
  type: string;

  @Column()
  category: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  duration: string;

  @Column("float")
  price: number;

  @Column({ default: "Active" })
  status: "Active" | "Cancelled" | "Completed";

  @Column()
  venueId: number;

  @ManyToOne(() => Venue, (venue) => venue.events, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "venueId" })
  venue: Relation<Venue>;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Relation<Ticket[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
