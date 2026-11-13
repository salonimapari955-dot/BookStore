import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../config/api";

function CreateBookModal({ isOpen, onClose, onCreated }) {
  const inputClass =
    "w-full px-3 py-2 border rounded bg-white text-black placeholder:text-gray-400";

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
      await axios.post(`${API_URL}/book`, {
        ...formData,
        price: Number(formData.price),
      });

      // SUCCESS SWEET ALERT
      Swal.fire({
        icon: "success",
        title: "Book Added!",
        text: "The book has been added successfully 📚",
        confirmButtonColor: "#16a34a",
      });

      onCreated(); 
      onClose(); 

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

      // ❌ ERROR SWEET ALERT
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not add the book. Please try again.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-md p-6 text-gray-900 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Book Name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Description"
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category (Free / Paid)"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className={inputClass}
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
