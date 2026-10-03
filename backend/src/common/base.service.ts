// Imports
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

// Class Definition
export abstract class BaseService {
  protected readonly logger: Logger;

  constructor(contextName: string) {
    this.logger = new Logger(contextName);
  }

  protected async execute<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Unhandled error during service execution: ${error.message}`, error.stack);
      throw new HttpException(
        error.message || 'Internal server error occurred',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
