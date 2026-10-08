// External Imports
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Internal Imports
import { Event } from "../events/entities/event.entity";
import { Ticket } from "./entities/ticket.entity";
import { TicketsController } from "./tickets.controller";
import { TicketsService } from "./tickets.service";
import { TicketsValidator } from "./tickets.validator";

// Module Definition
@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Event])],
  controllers: [TicketsController],
  providers: [TicketsService, TicketsValidator],
  exports: [TicketsService, TicketsValidator],
})
export class TicketsModule {}

