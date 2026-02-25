import React from "react";

function Cards({ item }) {
  const fallbackImage = "https://via.placeholder.com/400x300?text=Book+Image";

  return (
    <div className="mt-4 my-3 p-3 h-full">
      <div
        className="card bg-base-100 shadow-xl hover:scale-105 duration-200
                   dark:bg-slate-900 dark:text-white dark:border
                   h-[420px] flex flex-col"
      >
        {/* Image */}
        {/* Image container for vertical book covers */}
        <figure className="h-64 w-full flex items-center justify-center bg-gray-100">
          <img
            src={item.image || fallbackImage}
            alt={item.name}
            className="h-full w-auto object-contain"
            onError={(e) => (e.target.src = fallbackImage)}
          />
        </figure>

        {/* Card Body */}
        <div className="card-body flex flex-col p-4">
          {/* Title */}
          <h2 className="card-title text-base line-clamp-1">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>

          {/* Description */}
          <p className="text-sm line-clamp-2">{item.title}</p>

          {/* Bottom section */}
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
