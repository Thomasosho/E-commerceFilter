import React, { useState } from "react";
import Menu from "../component/Menu";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  DataSnapshot,
  remove,
  update,
} from "firebase/database";

function Product() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [product, setProduct] = useState([]);

  const currentProduct = product;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const database = getDatabase();

  const generateId = () => {
    const timestamp = Date.now().toString(36); // Unique timestamp representation
    const randomNumber = Math.random().toString(36).substr(2, 5); // Random number
    return `${timestamp}-${randomNumber}`;
  };

  const openModal = (product) => {
    setTitle(product.title);
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
      const channelRef = ref(database, `channelStations/${product.id}`);
      remove(channelRef)
        .then(() => {
          // Update the local state without fetching the data again
          setProduct((prevProduct) =>
            prevProduct.filter((station) => station.id !== product.id)
          );
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const id = selectedProduct ? selectedProduct.id : generateId();

      // Editing an existing category
      const productRef = ref(database, `products/${id}`);


      const updatedData = {
        id,
        title,
        slug: title.toLowerCase(),
        ...(selectedProduct
          ? { updatedAt: new Date().toISOString() }
          : { createdAt: new Date().toISOString() }),
      };

      if (!selectedProduct) {
        await set(productRef, updatedData);
        setProduct((prevProduct) =>
        prevProduct.map((product) =>
        product.id === selectedProduct.id
        ? { ...product, ...updatedData }
        : product
        )
        );
        setLoading(false);
      }

      const cleanData = Object.fromEntries(
        Object.entries(updatedData).filter(
          ([_, value]) => value !== undefined && value !== null
        )
      );

      if (selectedProduct) {
        // If selectedProduct exists, it's an edit, so update the existing product
        await update(productRef, cleanData);

        // Update the local state without fetching the data again
        setProduct((prevProduct) =>
          prevProduct.map((product) =>
            product.id === selectedProduct.id
              ? { ...product, ...updatedData }
              : product
          )
        );

        setLoading(false);
      } else {
        console.log("done");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error handling form submission:", error);
    }
  };

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <button
          className="btn btn-primary mb-3"
          onClick={() => setIsModalOpen(true)}
        >
          Add New
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProduct.map((product) => (
              <tr key={product.id}>
                <td>{product?.title}</td>
                <td>{product?.description}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => openModal(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
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
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: isModalOpen ? "block" : "none" }}
        role="dialog"
        id="exampleModalScrollable"
        aria-labelledby="exampleModalScrollableTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {selectedProduct ? "Edit Station" : "Add New Station"}
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
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    value={title}
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    value={description}
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {loading ? (
                  <button type="submit" className="btn btn-dark" disabled>
                    {selectedProduct ? "Updating..." : "Creating..."}
                  </button>
                ) : (
                  <button type="submit" className="btn btn-dark">
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
