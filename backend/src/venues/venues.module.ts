// External Imports
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Internal Imports
import { Venue } from "./entities/venue.entity";
import { VenuesController } from "./venues.controller";
import { VenuesService } from "./venues.service";

// Module Definition
@Module({
  imports: [TypeOrmModule.forFeature([Venue])],
  controllers: [VenuesController],
  providers: [VenuesService],
  exports: [VenuesService],
})
export class VenuesModule {}
