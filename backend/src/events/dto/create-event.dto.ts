// Imports
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Min,
} from "class-validator";

// DTO Definition
export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  imageURL: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(["Active", "Cancelled", "Completed"])
  status: "Active" | "Cancelled" | "Completed";

  @IsInt()
  @IsNotEmpty()
  venueId: number;
}
