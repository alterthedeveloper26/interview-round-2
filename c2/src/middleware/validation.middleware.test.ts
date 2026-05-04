import "reflect-metadata";
import { IsNotEmpty, IsString } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { validateDto } from "./validation.middleware";

class BodyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

describe("validateDto middleware", () => {
  function createResponseMock(): Response {
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    return response as unknown as Response;
  }

  it("calls next for valid body payload", async () => {
    const middleware = validateDto(BodyDto, "body");
    const req = { body: { name: "resource" } } as Request;
    const res = createResponseMock();
    const next = jest.fn() as NextFunction;

    await middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect((req.body as BodyDto).name).toBe("resource");
  });

  it("returns 400 for invalid body payload", async () => {
    const middleware = validateDto(BodyDto, "body");
    const req = { body: { name: "" } } as Request;
    const res = createResponseMock();
    const next = jest.fn() as NextFunction;

    await middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Validation failed."
      })
    );
  });
});
