import express from "express";
import { eq, like, or } from "drizzle-orm";
import { db } from "../db";
import { products, NewProduct } from "../models/product";

export const productsRouter = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns a list of products
 *     responses:
 *       200:
 *         description: A list of products
 */
productsRouter.get("/", (req, res) => {
  const allProducts = db.select().from(products).all();
  res.json(allProducts);
});

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products by name or description
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of matching products
 */
productsRouter.get("/search", (req, res) => {
  const query = req.query.query as string;

  if (!query) {
    // If no query is provided, return all products
    const allProducts = db.select().from(products).all();
    return res.json(allProducts);
  }

  const searchResults = db
    .select()
    .from(products)
    .where(
      or(
        like(products.name, `%${query}%`),
        like(products.description, `%${query}%`)
      )
    )
    .all();

  res.json(searchResults);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single product
 *       404:
 *         description: Product not found
 */
productsRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = db.select().from(products).where(eq(products.id, id)).get();

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
productsRouter.post("/", (req, res) => {
  const newProduct: NewProduct = req.body;

  if (
    !newProduct.name ||
    !newProduct.description ||
    typeof newProduct.price !== "number" ||
    !newProduct.category
  ) {
    return res.status(400).json({ message: "Invalid product data" });
  }

  const insertedProduct = db.insert(products).values(newProduct).run();
  res.status(201).json(insertedProduct);
});
