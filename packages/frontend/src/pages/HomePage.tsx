import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import ProductList from "../components/products/ProductList";
import Button from "../components/common/Button";
import { useProducts } from "../hooks/useProducts";
import Hero from "../components/sections/Hero";

const HomePage: React.FC = () => {
  const { productsQuery } = useProducts();

  const products = productsQuery.data?.slice(0, 3);

  const isLoading = productsQuery.isLoading;
  const isError = productsQuery.isError;

  return (
    <Layout>
      <section className="xl:padding-l wide:padding-r padding-b py-12">
        <Hero />
      </section>

      <div className="flex flex-col justify-start gap-5 mb-10">
        <h2 className="text-4xl font-palanquin font-bold">
          Our <span className="text-coral-red">Popular</span> Products
        </h2>
        <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
          Experience top-notch quality and style with our sought-after
          selections. Discover a world of comfort, design, and value
        </p>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading products</p>
      ) : products && products.length > 0 ? (
        <>
          <ProductList products={products} />
          <div className="mt-10 flex justify-center">
            <Link to="/products">
              <Button variant="primary">View All Products</Button>
            </Link>
          </div>
        </>
      ) : (
        <p>No products found</p>
      )}
    </Layout>
  );
};

export default HomePage;
