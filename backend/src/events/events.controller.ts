// Imports
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
import { CreateEventDto } from "./dto/create-event.dto";
import { Event } from "./entities/event.entity";
import { EventsService } from "./events.service";
import { Public } from "../auth/decorators/public.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { UpdateEventDto } from "./dto/update-event.dto";

// Controller Definition
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

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
