// Imports
import { CreateEventDto } from "./create-event.dto";
import { PartialType } from "@nestjs/mapped-types";

// DTO Definition
export class UpdateEventDto extends PartialType(CreateEventDto) {}
