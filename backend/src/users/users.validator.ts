// External Imports
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

// Internal Imports
import type { User } from "./entities/user.entity";

// Validator Definition
@Injectable()
export class UsersValidator {
  validateEmailNotRegistered(existingUser: User | null): void {
    if (existingUser) {
      throw new ConflictException("Email already registered");
    }
  }

  validateUserExists(user: User | null, id: number): User {
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
