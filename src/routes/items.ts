import express from "express";
import { openDb } from "../db";

export const itemsRouter = express.Router();

itemsRouter.get("/", async (_request, response) => {
  const db = await openDb();
  const items = await db.all("SELECT * FROM items");

  response.json(items);
});

itemsRouter.get("/:id", async (request, response) => {
  const db = await openDb();

  const item = await db.get(
    "SELECT * FROM items WHERE id = ?",
    request.params.id,
  );

  if (!item) {
    response.status(404).json({
      message: "Item not found",
    });

    return;
  }

  response.json(item);
});
