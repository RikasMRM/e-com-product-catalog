import axios from "axios";
import { Product, NewProduct } from "../types/product";

const getEnvVariable = (key: string, defaultValue: string): string =>
  import.meta.env[key] || defaultValue;

const API_URL = getEnvVariable("VITE_API_URI", "http://localhost:3000");

const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error("Failed to fetch products");
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error(`Failed to fetch product with ID: ${id}`);
};

export const createProduct = async (product: NewProduct): Promise<Product> => {
  const response = await api.post("/products", product);
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error("Failed to create product");
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await api.get("/products/search", {
    params: { query },
  });
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error("Failed to search products");
};
