import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import { deleteBook } from "../services/bookApi";
import Swal from "sweetalert2";

function Cards({ item, onEdit }) {
  const fallbackImage = "https://via.placeholder.com/400x300?text=Book+Image";

  const [authUser] = useAuth();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This book will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteBook(item._id);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Book deleted successfully 🗑️",
        confirmButtonColor: "#ec4899",
      });

      window.location.reload();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete book",
      });
    }
  };

  return (
    <div className="mt-4 my-3 p-3 h-full">
      <div
        className="relative card bg-base-100 shadow-xl hover:scale-105 duration-200
                   dark:bg-slate-900 dark:text-white dark:border
                   h-[420px] flex flex-col"
      >
        {/* EDIT & DELETE ICONS (ONLY AFTER LOGIN) */}
        {authUser && (
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <button
              className="btn btn-circle btn-xs border-0 bg-amber-400 shadow-md hover:bg-amber-500 dark:bg-amber-300 dark:hover:bg-amber-200"
              title="Edit Book"
              onClick={() => onEdit(item)}
            >
              <FaEdit className="h-3.5 w-3.5 text-slate-900" />
            </button>

            <button
              className="btn btn-circle btn-xs border-0 bg-red-600 shadow-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
              title="Delete Book"
              onClick={handleDelete}
            >
              <FaTrash className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
        )}

        <figure className="h-64 w-full flex items-center justify-center bg-gray-100">
          <img
            src={item.image || fallbackImage}
            alt={item.name}
            className="h-full w-auto object-contain"
            onError={(e) => (e.target.src = fallbackImage)}
          />
        </figure>

        <div className="card-body flex flex-col p-4">
          <h2 className="card-title text-base line-clamp-1">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>

          <p className="text-sm line-clamp-2">{item.title}</p>

          <div className="card-actions justify-between items-center mt-auto">
            <div className="px-3 py-1 text-sm rounded-full border border-gray-400">
              ₹{item.price}
            </div>

            <button
              className="px-3 py-1 text-sm rounded-full border border-gray-400
                         hover:bg-pink-500 hover:text-white duration-200"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
