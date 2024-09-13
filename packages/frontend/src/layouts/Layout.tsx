import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateProductModal from "../components/modals/CreateProductModal";
import { headerLogo } from "../assets/images";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-primary font-palanquin">
      <header className="bg-white shadow-3xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src={headerLogo}
                alt="logo"
                className="w-[129px] h-[29px] object-contain"
              />
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/products"
                className="text-slate-gray hover:text-coral-red transition-colors duration-300 font-montserrat text-lg"
              >
                Products
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-coral-red text-white px-4 py-2 rounded-full font-montserrat text-lg font-bold hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Create Product
              </button>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow max-w-7xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-white shadow-3xl mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-gray font-palanquin">Rikas.</p>
        </div>
      </footer>
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Layout;
