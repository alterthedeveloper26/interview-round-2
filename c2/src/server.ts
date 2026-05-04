import "reflect-metadata";
import { app } from "./app";

const PORT = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", error);
  process.exit(1);
});
