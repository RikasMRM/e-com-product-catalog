import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  getProducts,
  getProduct,
  createProduct,
  searchProducts,
} from "../services/api";
import { Product } from "../types/product";
import { useState, useCallback } from "react";
import debounce from "lodash/debounce";

export const useProducts = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const productsQuery: UseQueryResult<Product[], Error> = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const useProductQuery = (id: number): UseQueryResult<Product, Error> =>
    useQuery({
      queryKey: ["product", id],
      queryFn: () => getProduct(id),
    });

  const searchQuery: UseQueryResult<Product[], Error> = useQuery({
    queryKey: ["products", "search", searchTerm],
    queryFn: () => searchProducts(searchTerm),
    enabled: !!searchTerm,
  });

  const debouncedSetSearchTerm = useCallback(
    debounce((term: string) => setSearchTerm(term), 300),
    []
  );

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    productsQuery,
    useProductQuery,
    searchQuery,
    setSearchTerm: debouncedSetSearchTerm,
    createProductMutation,
  };
};
