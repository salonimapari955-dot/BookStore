import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      };

      const res = await axios.post(
        "http://localhost:4001/user/signup",
        userInfo,
      );

      if (res.data) {
        toast.success("Signup Successfully!");

        // save user
        localStorage.setItem("Users", JSON.stringify(res.data.user));

        // close modal
        document.getElementById("signup_modal").close();

        // redirect to home
        navigate("/", { replace: true });
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Server error");
      }
    }
  };

  return (
    <div>
      <dialog id="signup_modal" className="modal">
        <div className="modal-box shadow-none relative  dark:text-white  dark:bg-slate-900">
          {/* Close Button */}
          <button
            className="absolute right-2 top-2 text-gray-500 hover:text-black text-xl"
            onClick={() => document.getElementById("signup_modal").close()}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Signup</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="mt-4">
              <label>Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md  dark:text-black"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>

            {/* Email */}
            <div className="mt-4">
              <label>Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md dark:text-black"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div className="mt-4">
              <label>Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md dark:text-black"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-5">
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700"
              >
                Signup
              </button>

              <p className="text-sm">
                Have an account?{" "}
                <button
                  type="button"
                  className="underline text-blue-500"
                  onClick={() => {
                    document.getElementById("signup_modal").close();
                    document.getElementById("my_modal_4").showModal();
                  }}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Signup;
