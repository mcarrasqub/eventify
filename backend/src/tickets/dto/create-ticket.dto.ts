// External Imports
import { IsInt, IsNotEmpty, Min } from "class-validator";

// DTO Definition
export class CreateTicketDto {
  @IsInt()
  @IsNotEmpty()
  eventId: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantity: number;
}
