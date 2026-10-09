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
} from "@nestjs/common";

// Internal Imports
import { CreateVenueDto } from "./dto/create-venue.dto";
import { Public } from "../auth/decorators/public.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { UpdateVenueDto } from "./dto/update-venue.dto";
import { Venue } from "./entities/venue.entity";
import { VenuesService } from "./venues.service";

// Controller Definition
@Controller("venues")
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Public()
  @Get()
  async findAll(): Promise<Venue[]> {
    return await this.venuesService.findAll();
  }

  @Public()
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Venue> {
    return await this.venuesService.findOne(id);
  }

  @Roles("admin")
  @Post()
  async create(@Body() createVenueDto: CreateVenueDto): Promise<Venue> {
    return await this.venuesService.create(createVenueDto);
  }

  @Roles("admin")
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateVenueDto: UpdateVenueDto,
  ): Promise<Venue> {
    return await this.venuesService.update(id, updateVenueDto);
  }

  @Roles("admin")
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.venuesService.remove(id);
  }
}
