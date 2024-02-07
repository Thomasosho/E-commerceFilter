import React, { useState, useEffect } from "react";
import Menu from "../component/Menu";

function Product() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    let storedProducts = [];

    try {
      storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    } catch (error) {
      console.error("Error local storage:", error);
    }

    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const generateId = () => {
    const timestamp = Date.now().toString(36);
    const randomNumber = Math.random().toString(36).substr(2, 5);
    return `${timestamp}-${randomNumber}`;
  };

  const openModal = (product) => {
    setTitle(product.title);
    setDescription(product.description);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleDelete = (product) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the product "${product.title}"?`
    );

    if (confirmDelete) {
      const updatedProducts = products.filter((p) => p.id !== product.id);
      setProducts(updatedProducts);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const id = selectedProduct ? selectedProduct.id : generateId();
      const updatedData = {
        id,
        title,
        description,
        updatedAt: new Date().toISOString(),
      };

      if (selectedProduct) {
        const updatedProducts = products.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...updatedData } : p
        );
        setProducts(updatedProducts);
      } else {
        const newProduct = {
          ...updatedData,
          createdAt: new Date().toISOString(),
        };
        setProducts([...products, newProduct]);
      }

      setLoading(false);
      closeModal();
    } catch (error) {
      setLoading(false);
      console.error("form submission Error:", error);
    }
  };

  return (
    <div>
      <Menu />
      <div className="container mt-5 px-16">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
          onClick={() => setIsModalOpen(true)}
        >
          Add New
        </button>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.title}</td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => openModal(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className={`modal ${
          isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } fixed w-full h-full top-0 left-0 flex items-center justify-center transition-opacity duration-300 ease-in-out`}
        id="exampleModalScrollable"
        role="dialog"
        aria-labelledby="exampleModalScrollableTitle"
        aria-hidden={!isModalOpen}
      >
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="modal-header">
              <h5 className="modal-title text-xl font-bold">
                {selectedProduct ? "Edit Product" : "Add New Product"}
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => closeModal(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{ maxHeight: "600px", overflowY: "auto" }}
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    className="w-full border border-gray-300 p-2"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    className="w-full border border-gray-300 p-2"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {loading ? (
                  <button
                    type="submit"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    disabled
                  >
                    {selectedProduct ? "Updating..." : "Creating..."}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                  >
                    {selectedProduct ? "Update" : "Create"}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
