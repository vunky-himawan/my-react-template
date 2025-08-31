import type { APP_ERROR_ENUM } from "./enum";

export interface ErrorResponse {
  statusCode: number | string | undefined;
  message: string;
  error: APP_ERROR_ENUM;
}

export interface AppError {
  getStatusCode(): number | string | undefined;
  getMessage(): string;
  getError(): APP_ERROR_ENUM;
}
