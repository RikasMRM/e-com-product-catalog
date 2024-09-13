import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { products } from "../models/product";
import { sql } from "drizzle-orm";

const sqlite = new Database(":memory:");
export const db = drizzle(sqlite);

db.run(sql`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    category TEXT NOT NULL
  )
`);

db.insert(products)
  .values([
    {
      name: "Nike Air Max 90",
      description:
        "Iconic Nike sneaker with visible Air cushioning in the heel",
      price: 12000,
      category: "Lifestyle",
    },
    {
      name: "Nike Air Force 1",
      description: "Legendary Nike basketball shoe turned street classic",
      price: 9000,
      category: "Lifestyle",
    },
    {
      name: "Nike React Infinity Run",
      description:
        "Nike running shoe designed to reduce injury with React foam",
      price: 16000,
      category: "Running",
    },
    {
      name: "Nike Zoom Pegasus 38",
      description: "Versatile Nike running shoe with Zoom Air cushioning",
      price: 12000,
      category: "Running",
    },
    {
      name: "Nike Metcon 7",
      description: "Nike's popular cross-training shoe for gym workouts",
      price: 13000,
      category: "Training",
    },
    {
      name: "Nike Blazer Mid '77",
      description: "Retro-inspired Nike basketball shoe with vintage appeal",
      price: 10000,
      category: "Lifestyle",
    },
    {
      name: "Nike Air Zoom Structure 24",
      description: "Stable Nike running shoe for overpronators",
      price: 12000,
      category: "Running",
    },
  ])
  .run();

console.log("Database initialized with sample Nike shoe catalog data");
