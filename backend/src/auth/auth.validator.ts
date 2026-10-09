// External Imports
import { Injectable, UnauthorizedException } from "@nestjs/common";

// Internal Imports
import type { User } from "../users/entities/user.entity";

// Validator Definition
@Injectable()
export class AuthValidator {
  validateUserCredentials(user: User | null): User {
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }
    return user;
  }
}
