import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http-error";

export function notFoundMiddleware(_req: Request, _res: Response, next: NextFunction): void {
  next(new HttpError(404, "Route not found."));
}

export function errorMiddleware(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  res.status(500).json({ error: "Internal server error." });
}
