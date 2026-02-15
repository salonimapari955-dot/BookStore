import React from "react";
import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <dialog id="signup_modal" className="modal">
        <div className="modal-box shadow-none">
          {/* Close Button */}
          <button
            className="absolute right-2 top-2 text-gray-500 hover:text-black text-xl"
            onClick={() => document.getElementById("signup_modal").close()}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Signup</h3>

          {/* Name */}
          <div className="mt-4 space-y-2">
            <span>Name</span>
            <br />
            <input
              type="text"
              placeholder="Enter your fullname"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              {...register("name", { required: true })}
            />
            <br />
            {errors.name && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          {/* Email */}
          <div className="mt-4 space-y-2">
            <span>Email</span>
            <br />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              {...register("email", { required: true })}
            />
            <br />
            {errors.email && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          {/* Password */}
          <div className="mt-4 space-y-2">
            <span>Password</span>
            <br />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              {...register("password", { required: true })}
            />
            <br />
            {errors.password && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-around mt-4">
            <button
              className="bg-pink-500 text-white px-3 py-1 rounded-md hover:bg-pink-700 duration-200"
              onClick={handleSubmit(onSubmit)}
            >
              Signup
            </button>

            <p>
              Have an account?{" "}
              <button
                className="underline text-blue-500 cursor-pointer"
                onClick={() => {
                  document.getElementById("signup_modal").close();
                  document.getElementById("my_modal_4").showModal();
                }}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Signup;
