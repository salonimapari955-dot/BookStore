import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function EditBookModal({ isOpen, onClose, book, onUpdated }) {
  const inputClass =
    "w-full border border-gray-300 p-2 rounded bg-white text-gray-900 placeholder:text-gray-500 [color-scheme:light] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:[color-scheme:dark]";

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (book) {
      setFormData({
        name: book.name || "",
        title: book.title || "",
        price: book.price || "",
        category: book.category || "",
        image: book.image || "",
      });
    }
  }, [book]);

  if (!isOpen || !book) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Update Book?",
      text: "Do you want to save these changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, update it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`http://localhost:4001/book/${book._id}`, {
        ...formData,
        price: Number(formData.price),
      });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Book details have been updated successfully ✨",
        confirmButtonColor: "#16a34a",
      });

      onUpdated();
      onClose();
    } catch (error) {
      console.error("Update Error:", error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the book.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md text-gray-900 dark:bg-slate-900 dark:text-white">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Edit Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Book Name"
            aria-label="Book Name"
            className={inputClass}
          />

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Description"
            aria-label="Description"
            className={inputClass}
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            aria-label="Price"
            type="number"
            className={inputClass}
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            aria-label="Category"
            className={inputClass}
          />

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            aria-label="Image URL"
            className={inputClass}
          />

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-900 hover:bg-gray-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBookModal;
