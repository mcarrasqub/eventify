// External Imports
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Internal Imports
import { Venue } from "./entities/venue.entity";
import { VenuesController } from "./venues.controller";
import { VenuesService } from "./venues.service";
import { VenuesValidator } from "./venues.validator";

// Module Definition
@Module({
  imports: [TypeOrmModule.forFeature([Venue])],
  controllers: [VenuesController],
  providers: [VenuesService, VenuesValidator],
  exports: [VenuesService, VenuesValidator, TypeOrmModule],
})
export class VenuesModule {}

