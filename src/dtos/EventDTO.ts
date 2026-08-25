import type { EventInterface } from '../interfaces/EventInterface';

/**
 * ============================================================================
 * DTO: CreateEventDTO
 * Responsibility: Data Transfer Object contract for creating a new event.
 * Programming Rule: 1.2 (Domain Typing) & 2 (DTOs in src/dtos/).
 *
 * Why Omit?
 * We omit 'id', 'soldTickets', and 'createdAt' because the user does not enter
 * them in the form; the service calculates and assigns them automatically.
 * ============================================================================
 */
export type CreateEventDTO = Omit<EventInterface, 'id' | 'soldTickets' | 'createdAt'>;

/**
 * ============================================================================
 * DTO: UpdateEventDTO
 * Responsibility: Data Transfer Object contract for editing an existing event.
 *
 * Why Partial?
 * Allows updating only specific modified fields without requiring the caller
 * to rewrite every single attribute of the event.
 * ============================================================================
 */
export type UpdateEventDTO = Partial<CreateEventDTO>;
