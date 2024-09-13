import axios from "axios";
import { Product, NewProduct } from "../types/product";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/products");
  return response.data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: NewProduct): Promise<Product> => {
  const response = await api.post<Product>("/products", product);
  return response.data;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await api.get<Product[]>(`/products/search`, {
    params: { query },
  });
  return response.data;
};
