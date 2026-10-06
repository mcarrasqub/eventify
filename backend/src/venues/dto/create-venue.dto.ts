// External Imports
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from "class-validator";

// DTO Definition
export class CreateVenueDto {
  @IsOptional()
  @IsString()
  @IsUrl()
  imageURL?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;
}
