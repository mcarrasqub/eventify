// External Imports
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Internal Imports
import { Event } from "../../events/entities/event.entity";
import { SeedService } from "./seed.service";
import { Ticket } from "../../tickets/entities/ticket.entity";
import { User } from "../../users/entities/user.entity";
import { Venue } from "../../venues/entities/venue.entity";

// Module Definition
@Module({
  imports: [TypeOrmModule.forFeature([User, Venue, Event, Ticket])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
