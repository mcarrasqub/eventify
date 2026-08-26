// Imports
import type { UserInterface } from '@/interfaces/UserInterface.js';

// Types / DTOs
export type LoginDTO = Pick<UserInterface, 'email' | 'password'>;
export type UserResponseDTO = Omit<UserInterface, 'password'>;
