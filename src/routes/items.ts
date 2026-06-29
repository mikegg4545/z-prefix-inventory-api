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

itemsRouter.post("/", async (request, response) => {
  const db = await openDb();

  const { name, description, quantity } = request.body;

  if (!name || !description || quantity === undefined) {
    response.status(400).json({
      message: "Missing required fields",
    });

    return;
  }

  const result = await db.run(
    `
      INSERT INTO items (userId, name, description, quantity)
      VALUES (?, ?, ?, ?)
    `,
    1,
    name,
    description,
    quantity,
  );

  const item = await db.get("SELECT * FROM items WHERE id = ?", result.lastID);

  response.status(201).json(item);
});
