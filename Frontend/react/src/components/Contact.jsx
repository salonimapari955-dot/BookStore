import React from "react";

function Contact() {
  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 py-20">
      <h1 className="text-3xl font-semibold mb-10">Contact Us</h1>

      <form className="max-w-xl space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border rounded-md focus:outline-none 
            focus:border-blue-500 px-3 py-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder=" Email address"
            className="w-full border rounded-md focus:outline-none focus:border-blue-500 py-2"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            rows="4"
            placeholder="Type your message"
            className="w-full border rounded-md focus:outline-none focus:border-blue-500 py-2 resize-none"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
