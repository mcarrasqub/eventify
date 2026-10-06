// External Imports
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// Internal Imports
import type { CreateEventDto } from "./dto/create-event.dto";
import { Event } from "./entities/event.entity";
import type { UpdateEventDto } from "./dto/update-event.dto";
import { Venue } from "../venues/entities/venue.entity";

// Service Definition
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(Venue)
    private readonly venuesRepository: Repository<Venue>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const venue = await this.venuesRepository.findOneBy({
      id: createEventDto.venueId,
    });
    if (!venue) {
      throw new NotFoundException(
        `Venue with ID ${createEventDto.venueId} not found`,
      );
    }

    const newEvent = this.eventsRepository.create(createEventDto);
    return await this.eventsRepository.save(newEvent);
  }

  async findAll(query?: string, category?: string): Promise<Event[]> {
    const queryBuilder = this.eventsRepository
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.venue", "venue");

    if (category && category.trim() !== "" && category !== "All") {
      const catLower = category.trim().toLowerCase();
      queryBuilder.andWhere(
        "(LOWER(event.category) = :catLower OR LOWER(event.type) = :catLower)",
        { catLower },
      );
    }

    if (query && query.trim() !== "") {
      const searchTerm = `%${query.trim().toLowerCase()}%`;
      queryBuilder.andWhere(
        "(LOWER(event.title) LIKE :searchTerm OR LOWER(event.description) LIKE :searchTerm)",
        { searchTerm },
      );
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: ["venue"],
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);

    if (updateEventDto.venueId && updateEventDto.venueId !== event.venueId) {
      const venue = await this.venuesRepository.findOneBy({
        id: updateEventDto.venueId,
      });
      if (!venue) {
        throw new NotFoundException(
          `Venue with ID ${updateEventDto.venueId} not found`,
        );
      }
    }

    Object.assign(event, updateEventDto);
    return await this.eventsRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const event = await this.findOne(id);
    await this.eventsRepository.remove(event);
  }
}
