import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const VerifyCode = () => {
  const { handleSubmit } = useForm();

  const inputsRef = useRef([]);

  // Handle typing
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const onSubmit = () => {
    const code = inputsRef.current.map(input => input.value).join("");

    if (code.length < 6) {
      return toast.error("Enter full 6-digit code");
    }

    console.log("OTP Code:", code);

    // 🔥 Here you will verify with backend / Firebase later
    toast.success("Code verified (demo)");
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
      <div className="card-body text-center">

        <h1 className="text-3xl font-bold">Verify Code</h1>
        <p className="text-sm text-gray-500">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* OTP INPUTS */}
          <div className="flex justify-between gap-2 my-6">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="input input-bordered w-12 h-12 text-center text-xl"
              />
            ))}
          </div>

          {/* BUTTON */}
          <button className="btn bg-lime-400 hover:bg-lime-500 text-black w-full">
            Verify Code
          </button>

        </form>

      </div>
    </div>
  );
};

export default VerifyCode;