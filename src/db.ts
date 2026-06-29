import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  const db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);

  await db.run(`
    INSERT OR IGNORE INTO users (id, firstName, lastName, username, password)
    VALUES (1, 'Demo', 'User', 'demo', 'password')
  `);

  await db.run(`
    INSERT OR IGNORE INTO items (id, userId, name, description, quantity)
    VALUES (1, 1, 'Laptop', 'Work laptop for inventory testing', 3)
  `);

  return db;
}
