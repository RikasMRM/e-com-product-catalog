import React, { useState } from "react";
import { NewProduct } from "../../types/product";
import Input from "../common/Input";
import Button from "../common/Button";

interface ProductFormProps {
  onSubmit: (product: NewProduct) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [product, setProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value) * 100 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        id="name"
        name="name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Description"
        id="description"
        name="description"
        value={product.description}
        onChange={handleChange}
        required
      />
      <Input
        label="Price"
        id="price"
        name="price"
        type="number"
        value={product.price / 100}
        onChange={handleChange}
        required
        min="0"
        step="0.01"
      />
      <Input
        label="Category"
        id="category"
        name="category"
        value={product.category}
        onChange={handleChange}
        required
      />
      <Button type="submit">Create Product</Button>
    </form>
  );
};

export default ProductForm;
