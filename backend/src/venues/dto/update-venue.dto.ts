// Imports
import { PartialType } from "@nestjs/mapped-types";
import { CreateVenueDto } from "./create-venue.dto";

// DTO Definition
export class UpdateVenueDto extends PartialType(CreateVenueDto) {}
