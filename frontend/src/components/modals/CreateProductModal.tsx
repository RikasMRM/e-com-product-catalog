import React from "react";
import { useProducts } from "../../hooks/useProducts";
import { NewProduct } from "../../types/product";
import ProductForm from "../products/ProductForm";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createProductMutation } = useProducts();

  const handleCreateProduct = async (product: NewProduct) => {
    try {
      await createProductMutation.mutateAsync(product);
      onClose();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-gray bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-3xl max-w-md w-full m-4 border-t-4 border-coral-red transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-slate-gray hover:text-coral-red focus:outline-none transition-colors duration-200"
            aria-label="Close"
            title="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h3 className="text-2xl font-bold text-coral-red mb-6 font-montserrat">
            Create New Product
          </h3>
          <ProductForm onSubmit={handleCreateProduct} />
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
