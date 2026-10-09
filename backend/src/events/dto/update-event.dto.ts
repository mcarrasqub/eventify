// External Imports
import { PartialType } from "@nestjs/mapped-types";

// Internal Imports
import { CreateEventDto } from "./create-event.dto";

// DTO Definition
export class UpdateEventDto extends PartialType(CreateEventDto) {}
