// External Imports
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// Internal Imports
import type { CreateVenueDto } from "./dto/create-venue.dto";
import type { UpdateVenueDto } from "./dto/update-venue.dto";
import { Venue } from "./entities/venue.entity";

// Service Definition
@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue)
    private readonly venuesRepository: Repository<Venue>,
  ) {}

  async findAll(): Promise<Venue[]> {
    return await this.venuesRepository.find({
      relations: ["events"],
    });
  }

  async findOne(id: number): Promise<Venue> {
    const venue = await this.venuesRepository.findOne({
      where: { id },
      relations: ["events"],
    });

    if (!venue) {
      throw new NotFoundException(`Venue with ID ${id} not found`);
    }

    return venue;
  }

  async create(createVenueDto: CreateVenueDto): Promise<Venue> {
    const newVenue = this.venuesRepository.create(createVenueDto);
    return await this.venuesRepository.save(newVenue);
  }

  async update(id: number, updateVenueDto: UpdateVenueDto): Promise<Venue> {
    const venue = await this.findOne(id);
    Object.assign(venue, updateVenueDto);
    return await this.venuesRepository.save(venue);
  }

  async remove(id: number): Promise<void> {
    const venue = await this.findOne(id);

    if (venue.events && venue.events.length > 0) {
      throw new ConflictException(
        `Cannot delete venue with ID ${id} because it has ${venue.events.length} associated event(s).`,
      );
    }

    await this.venuesRepository.remove(venue);
  }
}
