// Imports
import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "../events/entities/event.entity";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { Ticket } from "./entities/ticket.entity";

// Service Class
@Injectable()
export class TicketsService {
  // Constructor
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  // Methods
  async getAvailableTickets(eventId: number): Promise<number> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ["venue"],
    });

    const sold = await this.ticketRepository.count({
      where: { eventId },
    });

    return event.venue.capacity - sold;
  }

  async purchase(
    createTicketDto: CreateTicketDto,
    userId: number,
  ): Promise<Ticket[]> {
    const { eventId, quantity } = createTicketDto;

    if (!quantity || quantity <= 0 || !Number.isInteger(quantity)) {
      throw new BadRequestException("Quantity must be a positive integer.");
    }

    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ["venue"],
    });

    if (event.status !== "Active") {
      throw new BadRequestException("Event is not active for ticket purchase");
    }

    const available = await this.getAvailableTickets(eventId);

    if (quantity > available) {
      throw new BadRequestException("Not enough tickets available");
    }

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
