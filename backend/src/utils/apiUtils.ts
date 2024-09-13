import { Response } from "express";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export function sendResponse<T>(
  res: Response,
  statusCode: number,
  data?: T,
  error?: string
) {
  const response: ApiResponse<T> = {
    success: !error,
    ...(data && { data }),
    ...(error && { error }),
  };
  res.status(statusCode).json(response);
}

export function handleServerError(res: Response, error: unknown) {
  console.error("Server error:", error);
  sendResponse(res, 500, undefined, "Internal server error");
}
