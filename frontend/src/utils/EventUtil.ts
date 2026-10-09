// Internal Imports
import type { EventInterface } from '@/interfaces/EventInterface.js';

export class EventUtil {
  static getUniqueCategories(events: EventInterface[]): string[] {
    const categories = events.map((event) => event.category);
    return Array.from(new Set(categories));
  }

  static getUniqueStatuses(events: EventInterface[]): string[] {
    const statuses = events.map((event) => event.status);
    return Array.from(new Set(statuses));
  }

  static getCategories(defaultCategories: string[], events: EventInterface[]): string[] {
    const uniqueFromEvents = this.getUniqueCategories(events);
    const merged = Array.from(new Set([...defaultCategories, ...uniqueFromEvents]));
    return merged.filter((cat) => cat.trim().length > 0);
  }
}
