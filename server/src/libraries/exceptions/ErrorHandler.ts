import { type Response } from 'express';
import { AppError, HttpCode } from './AppError';
import { exitHandler } from './ExitHandler';
import logger from '../logger/logger';

class ErrorHandler {
  public handleError(error: Error | AppError, response?: Response): void {
    if (this.isTrustedError(error) && response != null) {
      this.handleTrustedError(error as AppError, response);
    } else {
      this.handleUntrustedError(error, response);
    }
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isTrusted;
    }
    return false;
  }

  private handleTrustedError(error: AppError, response: Response): void {
    logger.error(error);
    response.status(error.httpCode).json({ message: error.message });
  }

  private handleUntrustedError(
    error: Error | AppError,
    response?: Response
  ): void {
    logger.fatal(error, 'Untrusted error');
    if (response != null) {
      response
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
    exitHandler.handleExit(1);
  }
}

export const errorHandler = new ErrorHandler();
