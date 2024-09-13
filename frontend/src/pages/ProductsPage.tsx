import React, { useState } from "react";
import Layout from "../layouts/Layout";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/products/ProductCard";
import Input from "../components/common/Input";

const ProductsPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const { productsQuery, searchQuery, setSearchTerm } = useProducts();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchTerm(value);
  };

  const products = searchQuery.data ?? productsQuery.data;

  const isLoading = productsQuery.isLoading || searchQuery.isLoading;
  const isError = productsQuery.isError || searchQuery.isError;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-coral-red font-montserrat">
            Our Products
          </h1>
          <form
            onSubmit={handleSearch}
            className="flex items-center justify-center"
          >
            <div>
              <Input
                label=""
                id="search"
                placeholder="Search products..."
                value={inputValue}
                onChange={handleInputChange}
                className="w-64"
              />
            </div>
          </form>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-slate-gray">Loading...</p>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-coral-red">Error loading products</p>
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-slate-gray">No products found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
