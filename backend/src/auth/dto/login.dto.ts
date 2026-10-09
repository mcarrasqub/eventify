// External Imports
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// DTO Definition
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
