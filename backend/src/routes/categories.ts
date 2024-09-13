import express from "express";
import { db } from "../db";
import { products } from "../models/product";

export const categoriesRouter = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Returns a list of available product categories
 *     responses:
 *       200:
 *         description: A list of categories
 */
categoriesRouter.get("/", (req, res) => {
  const categories = db
    .select({ category: products.category })
    .from(products)
    .groupBy(products.category)
    .all()
    .map((row) => row.category);

  res.json(categories);
});
