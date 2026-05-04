import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http-error";
import { errorMiddleware, notFoundMiddleware } from "./error.middleware";

describe("error middleware", () => {
  function createResponseMock(): Response {
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    return response as unknown as Response;
  }

  it("passes HttpError(404) in notFoundMiddleware", () => {
    const next = jest.fn();

    notFoundMiddleware({} as Request, {} as Response, next as unknown as NextFunction);

    expect(next).toHaveBeenCalledTimes(1);
    const error = next.mock.calls[0][0] as HttpError;
    expect(error).toBeInstanceOf(HttpError);
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe("Route not found.");
  });

  it("returns HttpError status and message", () => {
    const res = createResponseMock();
    const error = new HttpError(403, "Forbidden");

    errorMiddleware(error, {} as Request, res, jest.fn() as unknown as NextFunction);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Forbidden" });
  });

  it("returns 500 for unknown errors", () => {
    const res = createResponseMock();

    errorMiddleware(new Error("unexpected"), {} as Request, res, jest.fn() as unknown as NextFunction);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error." });
  });
});
