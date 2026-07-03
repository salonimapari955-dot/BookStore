import React from "react";

function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 max-w-screen-2xl container mx-auto px-4 md:px-20 py-20 dark:bg-slate-900 dark:text-white"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
        About BookStore
      </h2>

      <p className="text-lg mb-4 leading-relaxed">
        BookStore is a simple and beginner-friendly platform created to help
        learners explore, read, and discover books easily. Our goal is to make
        learning accessible to everyone by providing a clean and easy-to-use
        interface.
      </p>

      <p className="text-lg mb-4 leading-relaxed">
        Whether you are a student, a beginner in programming, or someone who
        loves reading, BookStore offers a collection of books and courses that
        support your learning journey. We focus on clarity, simplicity, and a
        smooth user experience.
      </p>
    </section>
  );
}

export default About;
