// Imports
import type { UserInterface, UserRole } from '@/interfaces/UserInterface.js';

// DTO Definitions
export type LoginDTO = Pick<UserInterface, 'email' | 'password'>;

export type RegisterDTO = Omit<UserInterface, 'id' | 'role' | 'password' | 'phone'> & {
  password: string;
  phone?: string;
  role?: UserRole;
};

export type UserResponseDTO = Omit<UserInterface, 'password'>;
