import React from "react";

function Cards({ item }) {
  console.log(item);
  return (
    
    <div className="mt-4 my-3 p-3">
   
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200  dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img
              src={item.image}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title} </p>
            <div className="card-actions justify-between">
              <div className="px-3 py-1 text-sm rounded-full border border-gray-400 text-gray-700">
  ${item.price}
</div>
              <button className=" cursor-pointer  px-2 py-1 text-sm  rounded-full border border-gray-400 hover:bg-pink-500 hover:text-white duration-200">
  Buy now
</button>

            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Cards;
