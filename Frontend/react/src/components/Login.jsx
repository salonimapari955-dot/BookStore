import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import ForgotPassword from "./Forgotpassword";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await axios.post(
        "http://localhost:4001/user/login",
        userInfo,
      );

      if (res.data) {
        toast.success("Login Successfully!");
        document.getElementById("my_modal_4").close();
        setTimeout(() => {
          window.location.reload();
          localStorage.setItem("Users", JSON.stringify(res.data.user));
        }, 1000);
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
        setTimeout(() => {}, 2000);
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box shadow-none relative  dark:text-white dark:bg-slate-900  ">
          {/* FORM START */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Close Button */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_4").close()}
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg mb-4 ">Login</h3>

            {/* Email */}
            <div className="mt-3 dark:text-white">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md outline-none dark:text-black "
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">Email is required</span>
              )}
            </div>

            {/* Password */}
            <div className="mt-3 dark:text-white">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md outline-none dark:text-black"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  Password is required
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-5">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700"
              >
                Login
              </button>

              <p className="text-sm">
                Not registered?{" "}
                <button
                  type="button"
                  className="text-blue-500 underline"
                  onClick={() => {
                    document.getElementById("my_modal_4").close();
                    document.getElementById("signup_modal").showModal();
                  }}
                >
                  Signup
                </button>
              </p>
            </div>
          </form>
          {/* FORM END */}

          <p className="text-sm mt-2">
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                document.getElementById("my_modal_4").close();
                document.getElementById("forgot_modal").showModal();
              }}
            >
              Forgot Password?
            </button>
          </p>
        </div>
      </dialog>
      <ForgotPassword />
    </div>
  );
}

export default Login;
