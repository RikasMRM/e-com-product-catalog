import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { productsRouter } from "./routes/products";
import { categoriesRouter } from "./routes/categories";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce Product Catalog API",
      version: "1.0.0",
      description: "API for managing products and categories",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
