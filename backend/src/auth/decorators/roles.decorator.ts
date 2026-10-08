// External Imports
import type { CustomDecorator } from "@nestjs/common";
import { SetMetadata } from "@nestjs/common";

// Roles Key Constant
export const ROLES_KEY = "roles";

// Decorator Definition
export const Roles = (
  ...roles: ("admin" | "user")[]
): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);
