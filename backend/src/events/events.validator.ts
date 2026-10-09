// External Imports
import { Injectable, NotFoundException } from "@nestjs/common";

// Internal Imports
import type { Event } from "./entities/event.entity";
import type { Venue } from "../venues/entities/venue.entity";

// Validator Definition
@Injectable()
export class EventsValidator {
  validateEventExists(event: Event | null, id: number): Event {
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  validateVenueExists(venue: Venue | null, venueId: number): Venue {
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${venueId} not found`);
    }
    return venue;
  }
}
