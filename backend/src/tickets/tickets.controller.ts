// Imports
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Public } from "../auth/decorators/public.decorator";
import type { User } from "../users/entities/user.entity";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import type { Ticket } from "./entities/ticket.entity";
import { TicketsService } from "./tickets.service";

// Controller Definition
@Controller("tickets")
export class TicketsController {
  // Constructor
  constructor(private readonly ticketsService: TicketsService) {}

  // Methods
  @Get("available/:eventId")
  @Public()
  async getAvailableTickets(
    @Param("eventId") eventId: string,
  ): Promise<number> {
    return await this.ticketsService.getAvailableTickets(Number(eventId));
  }

  @Post()
  async purchase(
    @Body() createTicketDto: CreateTicketDto,
    @CurrentUser() user: User,
  ): Promise<Ticket[]> {
    return await this.ticketsService.purchase(createTicketDto, user.id);
  }
}
