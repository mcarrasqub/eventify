// External Imports
import axios from 'axios';

/**
 * ErrorHandlerService
 * Centralized service to handle and format errors into user-friendly messages.
 */
export class ErrorHandlerService {
  /**
   * Formats an unknown error or Axios HTTP error into a user-friendly error message,
   */
  static getErrorMessage(err: unknown, fallbackMessage = 'An error occurred'): string {
    if (axios.isAxiosError(err)) {
      if (!err.response) {
        return 'Network error: Unable to reach the backend API. Please make sure the server is running.';
      }

      const status = err.response.status;
      const rawMessage = err.response.data?.message;
      const serverMessage = typeof rawMessage === 'string'
        ? rawMessage
        : Array.isArray(rawMessage)
          ? rawMessage.join(', ')
          : null;

      switch (status) {
        case 401:
          return serverMessage
            ? `401 Unauthorized: ${serverMessage}`
            : '401 Unauthorized: Authentication required or session expired. Please log in.';
        case 403:
          return serverMessage
            ? `403 Forbidden: ${serverMessage}`
            : '403 Forbidden: You do not have permission to perform this action.';
        case 404:
          return serverMessage
            ? `404 Not Found: ${serverMessage}`
            : '404 Not Found: The requested resource could not be found.';
        case 409:
          return serverMessage
            ? `409 Conflict: ${serverMessage}`
            : '409 Conflict: A data conflict occurred (e.g. duplicate resource).';
        default:
          return serverMessage || `Error ${status}: ${err.response.statusText || fallbackMessage}`;
      }
    }

    if (err instanceof Error) {
      return err.message;
    }

    return fallbackMessage;
  }
}
