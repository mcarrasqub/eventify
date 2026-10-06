// Imports
import { SetMetadata } from "@nestjs/common";
import type { CustomDecorator } from "@nestjs/common";

// Roles Key Constant
export const ROLES_KEY = "roles";

// Decorator Definition
export const Roles = (
  ...roles: ("admin" | "user")[]
): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);
