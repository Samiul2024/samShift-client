import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router";
import { confirmPasswordReset } from "firebase/auth";
// import { auth } from "../../firebase/firebase.config"; // adjust path
import useAuth from '../../../hooks/useAuth';

const ResetPassword = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  // Get oobCode from URL
  const query = new URLSearchParams(location.search);
  const oobCode = query.get("oobCode");

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast.success("Password reset successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-lg">
        
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* New Password */}
          <div>
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", { required: true })}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("confirmPassword", { required: true })}
            />
          </div>

          {/* Button */}
          <button className="btn w-full bg-lime-400 hover:bg-lime-500 text-black text-lg">
            Reset Password
          </button>

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;