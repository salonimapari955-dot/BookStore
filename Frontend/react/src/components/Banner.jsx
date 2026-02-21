import React from 'react'

function Banner() {
  return (
    <>
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
      <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32">
      <div className="space-y-12">
        <h1 className="text-4xl font-bold">Hello, welcomes here to learn something {" "} <span className="text-pink-500">new everyday!!!</span></h1>
      <p className='text-xl'>
        BookStore is a modern learning platform where books and courses come together to help you learn something new every day. Explore quality content, improve your skills, and grow at your own pace with resources designed for curious minds.
      </p>
      <label className="input input-bordered flex items-center gap-2 w-full border border-gray-300">
  <svg


    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    
    fill="currentColor"
    className="w-4 h-4 opacity-70"
  >
    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.144.446.206.652.206s.446-.062.652-.206l6.598-3.185a.493.493 0 0 1 .076-.032V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>

  <input
    type="text"
    className="grow" 
    placeholder="Email"
  />
</label>
      </div>
      <button className="btn btn-sm mt-6 bg-pink-500 hover:bg-pink-600 text-white border-none">
  Get Started

</button>

      </div>
      <div className=" order-1 w-full md:w-1/2 flex justify-center">
  <img
  src="/Banner.jpg"
  alt="Banner"
  className="w-80 md:w-92 lg:w-[600px] object-contain"/>

</div>
    </div>
    </>
  )
}

export default Banner
