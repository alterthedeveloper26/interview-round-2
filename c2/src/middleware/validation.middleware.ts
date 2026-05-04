import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

type ClassType<T> = new () => T;
type Source = "body" | "query" | "params";

export function validateDto<T>(DtoClass: ClassType<T>, source: Source = "body") {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const rawData = source === "body" ? req.body : source === "query" ? req.query : req.params;
    const dtoObject = plainToInstance(DtoClass, rawData);

    const errors = await validate(dtoObject as object, {
      whitelist: true,
      forbidNonWhitelisted: true
    });

    if (errors.length > 0) {
      const messages = errors
        .flatMap((error) => Object.values(error.constraints ?? {}))
        .filter((message) => message.length > 0);

      res.status(400).json({
        error: "Validation failed.",
        details: messages
      });
      return;
    }

    if (source === "body") {
      req.body = dtoObject;
    } else if (source === "query") {
      req.query = dtoObject as Request["query"];
    } else {
      req.params = dtoObject as Request["params"];
    }

    next();
  };
}
