import React from "react";

function Contact({ isModal = false, onClose }) {
  return (
    <div
      className={`${
        isModal
          ? "bg-white dark:bg-slate-900 rounded-lg p-6 w-full max-w-lg relative"
          : "max-w-screen-2xl container mx-auto px-4 md:px-20 py-20  "
      }`}
    >
      {isModal && (
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-black "
        >
          ×
        </button>
      )}

      <h1 className="text-3xl font-semibold mb-10 dark:text-white  ">
        Contact Us
      </h1>

      <form className="max-w-xl space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border rounded-md px-3 py-2 focus:outline-none text-black"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">
            Email
          </label>
          <input
            type="email"
            placeholder="Email address"
            className="w-full border rounded-md px-3 py-2 focus:outline-none text-black"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">
            Message
          </label>
          <textarea
            rows="4"
            placeholder="Type your message"
            className="w-full border rounded-md px-3 py-2 focus:outline-non resize-none text-black"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-pink-500 text-white px-6 py-2 rounded "
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
