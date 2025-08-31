import { appConfig } from "@/config";
import { ERROR_MESSAGES, type AppError } from "../types";
import { mapError, mapErrorToEnum } from "./mapper";

export const errorHandler = (error: AppError) => {
  const isDev = appConfig.env === "development";

  const userMessage = error ? ERROR_MESSAGES[mapErrorToEnum(error)] : "Something went wrong";

  const mappedError = mapError(error);

  return {
    statusCode: typeof mappedError.statusCode === "string" ? undefined : mappedError.statusCode,
    message: isDev ? mappedError.message : userMessage,
  };
};
