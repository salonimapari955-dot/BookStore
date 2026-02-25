import React, { useState } from "react";
import axios from "axios";

function CreateBookModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    category: "",
    price: "",
    image: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4001/book", {
        ...formData,
        price: Number(formData.price),
      });

      onCreated(); // refresh list
      onClose(); // close modal

      // reset form
      setFormData({
        name: "",
        title: "",
        category: "",
        price: "",
        image: "",
      });
    } catch (error) {
      console.error("Create Book Error:", error);
      alert("Failed to create book");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Book Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Description"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category (Free / Paid)"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBookModal;
