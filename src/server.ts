import cors from "cors";
import express from "express";
import { openDb } from "./db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_request, response) => {
  response.send("Hello from Inventory API!");
});

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/items", async (_request, response) => {
  const db = await openDb();
  const items = await db.all("SELECT * FROM items");

  response.json(items);
});

async function startServer() {
  await openDb();

  app.listen(PORT, () => {
    console.log(`Inventory API is running on http://localhost:${PORT}`);
  });
}

startServer();
