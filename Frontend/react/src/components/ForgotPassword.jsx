import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch("password");

  // STEP 1: CHECK USER
  const checkUser = async (data) => {
    try {
      await axios.post("http://localhost:4001/user/check-user", {
        email: data.email.trim(),
      });

      setEmail(data.email);
      setStep(2);
      toast.success("Account found");
    } catch (error) {
      toast.error("Account does not exist");
    }
  };

  // STEP 2: RESET PASSWORD
  const resetPassword = async (data) => {
    try {
      await axios.post("http://localhost:4001/user/reset-password-direct", {
        email: email.trim(),
        password: data.password,
      });
      toast.success("Password updated successfully");
      document.getElementById("forgot_modal").close();
      setStep(1);
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  return (
    <dialog id="forgot_modal" className="modal modal-backdrop-transparent">
      <div className="modal-box shadow-none dark:bg-slate-900 dark:text-white">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            document.getElementById("forgot_modal").close();
            setStep(1);
          }}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h3>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSubmit(checkUser)}>
            <label>Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded mb-2 text-black"
              placeholder="Enter registered email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">Email required</p>
            )}

            <button className="w-full mt-4 bg-pink-500 text-white py-2 rounded">
              Check Account
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleSubmit(resetPassword)}>
            <label>New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded mb-2 text-black"
              {...register("password", { required: true, minLength: 6 })}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded mb-2 text-black"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />

            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}

            <button
              disabled={isSubmitting}
              className="w-full mt-4 bg-pink-500 text-white py-2 rounded"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}

export default ForgotPassword;
