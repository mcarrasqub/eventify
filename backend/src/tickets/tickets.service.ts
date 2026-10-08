// External Imports
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// Internal Imports
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { Event } from "../events/entities/event.entity";
import type { EventRevenueDto } from "./dto/event-revenue.dto";
import { Ticket } from "./entities/ticket.entity";
import type { TicketDistributionDto } from "./dto/ticket-distribution.dto";
import { TicketsValidator } from "./tickets.validator";

// Service Class
@Injectable()
export class TicketsService {
  // Constructor
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly ticketsValidator: TicketsValidator,
  ) {}

  // Methods
  async getRevenueByEvent(): Promise<EventRevenueDto[]> {
    const events = await this.eventRepository.find();
    const result: EventRevenueDto[] = [];

    for (const event of events) {
      const soldCount = await this.ticketRepository.count({
        where: { eventId: event.id },
      });
      result.push({
        eventId: event.id,
        eventTitle: event.title,
        revenue: soldCount * (event.price ?? 0),
      });
    }

    return result;
  }

  async getDistribution(eventId?: number): Promise<TicketDistributionDto> {
    if (eventId) {
      const event = await this.eventRepository.findOne({
        where: { id: eventId },
        relations: ["venue"],
      });

      this.ticketsValidator.validateEventExists(event);

      const sold = await this.ticketRepository.count({
        where: { eventId: event!.id },
      });
      const capacity = event!.venue?.capacity ?? 0;
      const available = Math.max(0, capacity - sold);

      return {
        eventId: event!.id,
        eventTitle: event!.title,
        sold,
        available,
      };
    }

    const events = await this.eventRepository.find({
      relations: ["venue"],
    });

    let totalSold = 0;
    let totalAvailable = 0;

    for (const event of events) {
      const sold = await this.ticketRepository.count({
        where: { eventId: event.id },
      });
      const capacity = event.venue?.capacity ?? 0;
      totalSold += sold;
      totalAvailable += Math.max(0, capacity - sold);
    }

    return {
      eventId: null,
      eventTitle: "All events",
      sold: totalSold,
      available: totalAvailable,
    };
  }

  async getAvailable(eventId: number): Promise<number> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ["venue"],
    });

    this.ticketsValidator.validateEventExists(event);

    const sold = await this.ticketRepository.count({
      where: { eventId },
    });

    const capacity = event!.venue?.capacity ?? 0;
    return Math.max(0, capacity - sold);
  }

  async findAll(eventId?: number): Promise<Ticket[]> {
    if (eventId) {
      return await this.ticketRepository.find({
        where: { eventId },
        relations: ["event"],
      });
    }

    return await this.ticketRepository.find({
      relations: ["event"],
    });
  }

  async create(
    createTicketDto: CreateTicketDto,
    userId: number,
  ): Promise<Ticket[]> {
    const { eventId, quantity } = createTicketDto;

    this.ticketsValidator.validateQuantity(quantity);

    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ["venue"],
    });

    this.ticketsValidator.validateEventExists(event);
    this.ticketsValidator.validateEventActive(event!);

    const available = await this.getAvailable(eventId);

    this.ticketsValidator.validateAvailableTickets(quantity, available);

    const ticketsToCreate: Ticket[] = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.ticketRepository.create({
        eventId,
        userId,
        status: "Valid",
      });
      ticketsToCreate.push(ticket);
    }

    return await this.ticketRepository.save(ticketsToCreate);
  }
}
