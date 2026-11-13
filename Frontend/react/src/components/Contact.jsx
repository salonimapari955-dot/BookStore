import React, { useState } from "react";
import axios from "axios";

const EMPTY_FORM = {
  name: "",
  email: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Contact({ isModal = false, onClose }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  };

  const validate = () => {
    const nextErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name) {
      nextErrors.name = "Name is required";
    }

    if (!email) {
      nextErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!message) {
      nextErrors.message = "Message is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting || !validate()) {
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await axios.post("http://localhost:4001/contact", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      setFormData(EMPTY_FORM);
      setErrors({});
      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to send your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <form className="max-w-xl space-y-6" onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={`w-full border rounded-md px-3 py-2 focus:outline-none text-black ${
              errors.name ? "border-red-500" : ""
            }`}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className={`w-full border rounded-md px-3 py-2 focus:outline-none text-black ${
              errors.email ? "border-red-500" : ""
            }`}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">
            Message
          </label>
          <textarea
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message"
            className={`w-full border rounded-md px-3 py-2 focus:outline-non resize-none text-black ${
              errors.message ? "border-red-500" : ""
            }`}
            aria-invalid={Boolean(errors.message)}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        {status.message && (
          <p
            role={status.type === "error" ? "alert" : "status"}
            className={`text-sm ${
              status.type === "success"
                ? "text-green-600 dark:text-green-400"
                : "text-red-500"
            }`}
          >
            {status.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-pink-500 text-white px-6 py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Contact;
