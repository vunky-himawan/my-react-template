import {
  APP_ERROR_ENUM,
  AXIOS_CODE_MAPPING,
  STATUS_CODE_MAPPING,
  type AppError,
  type ErrorResponse,
} from "../types";

export const mapError = (error: AppError): ErrorResponse => {
  return {
    statusCode: error.getStatusCode(),
    message: error.getMessage(),
    error: error.getError(),
  };
};

export function mapErrorToEnum(error: AppError): APP_ERROR_ENUM {
  const statusCode = error.getStatusCode();

  if (typeof statusCode === "string") {
    return AXIOS_CODE_MAPPING[statusCode] || APP_ERROR_ENUM.UNKNOWN_ERROR;
  }

  return statusCode && statusCode in STATUS_CODE_MAPPING
    ? STATUS_CODE_MAPPING[statusCode]
    : APP_ERROR_ENUM.UNKNOWN_ERROR;
}
