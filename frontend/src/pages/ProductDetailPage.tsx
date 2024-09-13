import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useProducts } from "../hooks/useProducts";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { useProductQuery } = useProducts();
  const {
    data: product,
    isLoading,
    isError,
  } = useProductQuery(parseInt(id || "0"));

  if (isLoading)
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-slate-gray">Loading...</p>
        </div>
      </Layout>
    );
  if (isError)
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-coral-red">Error loading product</p>
        </div>
      </Layout>
    );
  if (!product)
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-slate-gray">Product not found</p>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white shadow-3xl rounded-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-coral-red mb-4 font-montserrat">
            {product.name}
          </h1>
          <p className="text-slate-gray mb-6 font-palanquin">
            {product.description}
          </p>
          <div className="flex justify-between items-center mb-8">
            <span className="text-3xl font-bold text-coral-red font-montserrat">
              ${(product.price / 100).toFixed(2)}
            </span>
            <span className="text-lg bg-pale-blue text-slate-gray px-4 py-2 rounded-full font-palanquin">
              {product.category}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold mb-4 font-montserrat">
              Product Details
            </h2>
            <ul className="list-disc list-inside text-slate-gray font-palanquin">
              <li>High-quality materials</li>
              <li>Durable construction</li>
              <li>Perfect for everyday use</li>
            </ul>
          </div>
          <div className="mt-8 flex justify-between items-center">
            <Link
              to="/"
              className="text-coral-red hover:text-red-700 transition-colors duration-300 font-montserrat"
            >
              ← Back to Products
            </Link>
            <button className="bg-coral-red text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors duration-300 font-bold font-montserrat">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
