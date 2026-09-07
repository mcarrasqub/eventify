export default class Utils {
  static generateNextId<T extends { id: number }>(items: T[]): number {
    return items.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
  }
}
