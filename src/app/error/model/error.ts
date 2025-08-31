import type { AxiosError } from "axios";
import { APP_ERROR_ENUM, type AppError, type ErrorResponse } from "../types";

// Axios Error
export class AxiosAppError implements AppError {
  constructor(private error: AxiosError) {}

  getStatusCode(): number | string | undefined {
    if (typeof this.error.code === "string") {
      return this.error.code as string;
    }
    return this.error.response?.status;
  }

  getMessage(): string {
    return (
      (this.error.response?.data as ErrorResponse)?.message || this.error.message || "Network error"
    );
  }

  getError(): APP_ERROR_ENUM {
    return (this.error.response?.data as ErrorResponse)?.error;
  }
}

// Custom Error
export class CustomError extends Error implements AppError {
  code?: number;
  error: APP_ERROR_ENUM;

  constructor(message: string, code?: number) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.error = APP_ERROR_ENUM.UNKNOWN_ERROR;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  getStatusCode(): number | undefined {
    return this.code;
  }

  getMessage(): string {
    return this.message;
  }

  getError(): APP_ERROR_ENUM {
    return this.error;
  }
}
export class PageNotFound extends CustomError {
  constructor() {
    super("Page Not Found", 404);
    this.error = APP_ERROR_ENUM.NOT_FOUND;
  }
}
export class UnhandledRejectionError extends CustomError {
  constructor(message: string) {
    super(message);
    this.error = APP_ERROR_ENUM.PROMISE_REJECTION;
  }
}
