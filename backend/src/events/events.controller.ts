// External Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

// Internal Imports
import { CreateEventDto } from "./dto/create-event.dto";
import type { EventSummaryDto } from "./dto/event-summary.dto";
import type { EventsByCityDto } from "./dto/events-by-city.dto";
import type { Event } from "./entities/event.entity";
import { EventsService } from "./events.service";
import { Public } from "../auth/decorators/public.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { UpdateEventDto } from "./dto/update-event.dto";

// Controller Definition
@Controller("events")
export class EventsController {
  // Constructor
  constructor(private readonly eventsService: EventsService) {}

  // Methods
  @Roles("admin")
  @Get("summary")
  async getSummary(): Promise<EventSummaryDto> {
    return await this.eventsService.getEventSummary();
  }

  @Roles("admin")
  @Get("by-city")
  async getByCity(): Promise<EventsByCityDto[]> {
    return await this.eventsService.getEventsByCity();
  }

  @Public()
  @Get()
  async findAll(
    @Query("query") query?: string,
    @Query("category") category?: string,
  ): Promise<Event[]> {
    return await this.eventsService.findAll(query, category);
  }

  @Public()
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Event> {
    return await this.eventsService.findOne(id);
  }

  @Roles("admin")
  @Post()
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventsService.create(createEventDto);
  }

  @Roles("admin")
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return await this.eventsService.update(id, updateEventDto);
  }

  @Roles("admin")
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.eventsService.remove(id);
  }
}
