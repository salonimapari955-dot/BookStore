import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateBookModal from "./AddBook";
import { useAuth } from "../context/AuthProvider";
import EditBookModal from "./EditBookModal";
import { API_URL } from "../config/api";

function Course() {
  const [book, setBook] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [authUser] = useAuth();
  const [editBook, setEditBook] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/book`);
      setBook(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 ">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl font-semibold md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>

          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        {/* Add Book Button */}
        {authUser && (
          <div className="flex justify-end mt-10">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              + Add Book
            </button>
          </div>
        )}

        {/* Books */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {book.map((item) => (
            <Cards
              key={item._id}
              item={item}
              onEdit={(selectedBook) => {
                setEditBook(selectedBook);
                setShowEditModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Create Modal */}
      <CreateBookModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={fetchBooks}
      />

      <EditBookModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        book={editBook}
        onUpdated={fetchBooks}
      />
    </>
  );
}

export default Course;
