// External Imports
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";

// Internal Imports
import { Event } from "../../events/entities/event.entity";

// Entity Definition
@Entity("venues")
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imageURL: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column("int")
  capacity: number;

  @Column("float", { nullable: true })
  latitude: number;

  @Column("float", { nullable: true })
  longitude: number;

  @OneToMany(() => Event, (event) => event.venue)
  events: Relation<Event[]>;
}
