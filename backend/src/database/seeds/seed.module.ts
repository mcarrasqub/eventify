// Imports
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "../../events/entities/event.entity";
import { Ticket } from "../../tickets/entities/ticket.entity";
import { User } from "../../users/entities/user.entity";
import { Venue } from "../../venues/entities/venue.entity";
import { SeedService } from "./seed.service";

// Module Definition
@Module({
  imports: [TypeOrmModule.forFeature([User, Venue, Event, Ticket])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
