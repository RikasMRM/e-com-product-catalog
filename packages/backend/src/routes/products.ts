// File: packages/backend/src/routes/products.ts

import express from "express";
import { eq, like, or } from "drizzle-orm";
import { db } from "../db";
import { products, NewProduct } from "../models/product";
import { sendResponse, handleServerError } from "../utils/apiUtils";

export const productsRouter = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns a list of products
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Internal server error
 */
productsRouter.get("/", (req, res) => {
  try {
    const allProducts = db.select().from(products).all();
    sendResponse(res, 200, allProducts);
  } catch (error) {
    handleServerError(res, error);
  }
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
 *       500:
 *         description: Internal server error
 */
productsRouter.get("/search", (req, res) => {
  try {
    const query = req.query.query as string;

    let searchResults;
    if (!query) {
      searchResults = db.select().from(products).all();
    } else {
      searchResults = db
        .select()
        .from(products)
        .where(
          or(
            like(products.name, `%${query}%`),
            like(products.description, `%${query}%`)
          )
        )
        .all();
    }

    sendResponse(res, 200, searchResults);
  } catch (error) {
    handleServerError(res, error);
  }
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
 *       500:
 *         description: Internal server error
 */
productsRouter.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return sendResponse(res, 400, undefined, "Invalid product ID");
    }

    const product = db.select().from(products).where(eq(products.id, id)).get();

    if (product) {
      sendResponse(res, 200, product);
    } else {
      sendResponse(res, 404, undefined, "Product not found");
    }
  } catch (error) {
    handleServerError(res, error);
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
 *       500:
 *         description: Internal server error
 */
productsRouter.post("/", (req, res) => {
  try {
    const newProduct: NewProduct = req.body;

    if (
      !newProduct.name ||
      !newProduct.description ||
      typeof newProduct.price !== "number" ||
      newProduct.price <= 0 ||
      !newProduct.category
    ) {
      return sendResponse(res, 400, undefined, "Invalid product data");
    }

    const insertedProduct = db.insert(products).values(newProduct).run();
    sendResponse(res, 201, insertedProduct);
  } catch (error) {
    handleServerError(res, error);
  }
});
