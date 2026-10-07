// Imports
import { Body, Controller, Post } from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
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
  @Post()
  async purchase(
    @Body() createTicketDto: CreateTicketDto,
    @CurrentUser() user: User,
  ): Promise<Ticket[]> {
    return await this.ticketsService.purchase(createTicketDto, user.id);
  }
}
