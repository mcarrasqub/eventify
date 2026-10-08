// External Imports
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

// Internal Imports
import type { Venue } from "./entities/venue.entity";

// Validator Definition
@Injectable()
export class VenuesValidator {
  validateVenueExists(venue: Venue | null, id: number): Venue {
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${id} not found`);
    }
    return venue;
  }

  validateNoAssociatedEvents(venue: Venue): void {
    if (venue.events && venue.events.length > 0) {
      throw new ConflictException(
        `Cannot delete venue with ID ${venue.id} because it has ${venue.events.length} associated event(s).`,
      );
    }
  }
}
