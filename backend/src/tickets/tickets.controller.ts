// External Imports
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";

// Internal Imports
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import type { EventRevenueDto } from "./dto/event-revenue.dto";
import { Public } from "../auth/decorators/public.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import type { Ticket } from "./entities/ticket.entity";
import type { TicketDistributionDto } from "./dto/ticket-distribution.dto";
import { TicketsService } from "./tickets.service";
import type { User } from "../users/entities/user.entity";

// Controller Definition
@Controller("tickets")
export class TicketsController {
  // Constructor
  constructor(private readonly ticketsService: TicketsService) {}

  // Methods
  @Roles("admin")
  @Get("revenue")
  async getRevenue(): Promise<EventRevenueDto[]> {
    return await this.ticketsService.getRevenueByEvent();
  }

  @Roles("admin")
  @Get("distribution/all")
  async getAllDistribution(): Promise<TicketDistributionDto> {
    return await this.ticketsService.getTicketDistribution();
  }

  @Roles("admin")
  @Get("distribution/:eventId")
  async getEventDistribution(
    @Param("eventId", ParseIntPipe) eventId: number,
  ): Promise<TicketDistributionDto> {
    return await this.ticketsService.getTicketDistribution(eventId);
  }

  @Public()
  @Get("available/:eventId")
  async getAvailableTickets(
    @Param("eventId", ParseIntPipe) eventId: number,
  ): Promise<number> {
    return await this.ticketsService.getAvailableTickets(eventId);
  }

  @Roles("admin")
  @Get()
  async getAll(@Query("eventId") eventId?: string): Promise<Ticket[]> {
    return await this.ticketsService.findAll(
      eventId ? Number(eventId) : undefined,
    );
  }

  @Post()
  async purchase(
    @Body() createTicketDto: CreateTicketDto,
    @CurrentUser() user: User,
  ): Promise<Ticket[]> {
    return await this.ticketsService.purchase(createTicketDto, user.id);
  }
}
