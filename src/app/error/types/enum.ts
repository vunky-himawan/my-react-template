export enum APP_ERROR_ENUM {
  // HTTP
  INTERNAL_SERVER_ERROR = "InternalServerError",
  NOT_FOUND = "NotFound",
  CONFLICT = "Conflict",
  BAD_REQUEST = "BadRequest",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  TOO_MANY_REQUESTS = "TooManyRequests",
  UNPROCESSABLE_ENTITY = "UnprocessableEntity",

  // Non-HTTP / frontend
  NETWORK_ERROR = "NetworkError",
  TIMEOUT_ERROR = "TimeoutError",
  PROMISE_REJECTION = "PromiseRejection",
  UNKNOWN_ERROR = "UnknownError",
}

export enum AXIOS_INTERNAL_ERROR_CODE {
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
}
