import express from "express";
import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "./docs/openapi";
import { errorMiddleware, notFoundMiddleware } from "./middleware/error.middleware";
import { resourceRouter } from "./routes/resource.routes";

export const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/openapi.json", (_req, res) => {
  res.status(200).json(openApiDocument);
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use("/resources", resourceRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
