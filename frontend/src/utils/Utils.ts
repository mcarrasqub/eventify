export default class Utils {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static generateNextId(items: any[]): number {
    return items.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
  }
}
