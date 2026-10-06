// Imports
import { SetMetadata } from "@nestjs/common";
import type { CustomDecorator } from "@nestjs/common";

// Public Key Constant
export const IS_PUBLIC_KEY = "isPublic";

// Decorator Definition
export const Public = (): CustomDecorator<string> =>
  SetMetadata(IS_PUBLIC_KEY, true);
