import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Components/firebase";
import { toast } from "react-toastify";
import loginImg from "../Assets/login.svg";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!", {
        position: "top-center",
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <div className='bg-gradient-to-r from-[#0d222b] via-[#061F2B] to-[#0C4861] min-h-screen p-7'>
        <div className='flex items-center justify-center'>
          <div className='w-1/2 m-3 p-3 hidden md:block'>
            <img src={loginImg} className='h-[60vh]' alt="Login visual" />
            <h1 style={{ fontFamily: '"Leckerli One", cursive' }} className='text-white font-extralight text-2xl m-3'>
              Welcome, unlock your full potential.
            </h1>
          </div>
          <div className='bg-white md:w-1/3 rounded-xl flex flex-col p-3 items-center justify-center'>
            <h1 style={{ fontFamily: '"Leckerli One", cursive' }} className='font-extralight mb-12 text-2xl m-3'>StudySync</h1>
            <p className='p-3 font-bold text-xl'>Forgot Password</p>
            <form className="flex mb-5 flex-col gap-0 justify-center items-center" onSubmit={handleReset}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                className="border border-gray-300 p-2 rounded w-full mb-4"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="border-2 text-md mt-1 pl-5 pr-5 pt-1 pb-1 border-[#0C4861] rounded-xl
                text-white hover:text-[#0C4861] bg-[#0C4861] hover:bg-transparent">
                Send Reset Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;