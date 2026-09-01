// Imports
import type { TicketInterface } from '@/interfaces/TicketInterface.js';

// DTO Definitions
export type CreateTicketDTO = Omit<TicketInterface, 'id'> & {
  quantity: number;
};

export type TicketDTO = CreateTicketDTO;

export type UpdateTicketDTO = Partial<CreateTicketDTO>;
