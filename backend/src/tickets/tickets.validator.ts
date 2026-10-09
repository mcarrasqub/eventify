// External Imports
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

// Internal Imports
import type { Event } from "../events/entities/event.entity";

// Validator Definition
@Injectable()
export class TicketsValidator {
  validateQuantity(quantity?: number): void {
    if (!quantity || quantity <= 0 || !Number.isInteger(quantity)) {
      throw new BadRequestException("Quantity must be a positive integer.");
    }
  }

  validateEventExists(event: Event | null): Event {
    if (!event) {
      throw new NotFoundException("Event not found");
    }
    return event;
  }

  validateEventActive(event: Event): void {
    if (event.status !== "Active") {
      throw new BadRequestException("Event is not active for ticket purchase");
    }
  }

  validateAvailableTickets(quantity: number, available: number): void {
    if (quantity > available) {
      throw new BadRequestException("Not enough tickets available");
    }
  }
}
