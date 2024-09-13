import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-4 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-coral-red">
              ${(product.price / 100).toFixed(2)}
            </span>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          <Link
            to={`/product/${product.id}`}
            className="block w-full text-center bg-coral-red text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
