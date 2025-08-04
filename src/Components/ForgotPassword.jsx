import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import loginImg from "../Assets/Login.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Check your inbox for the reset link!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate('/login');
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className='bg-gradient-to-r from-[#0d222b] via-[#061F2B] to-[#0C4861] min-h-screen p-7 flex items-center justify-center'>
        <div className='w-1/2 m-3 p-3 hidden md:block'>
            <img src={loginImg} className='h-[60vh]'></img>
            <h1 style={{ fontFamily: '"Leckerli One", cursive' }} className='text-white font-extralight text-2xl m-3'>Welcome, unlock your full potential.</h1>
        </div>
        <div className='bg-white md:w-1/3 pb-7 rounded-xl flex flex-col p-3 items-center justify-center'>
            <h1 style={{ fontFamily: '"Leckerli One", cursive' }} className='font-extralight mb-4 text-2xl m-3'>StudySync</h1>
            <p className='p-3 text-lg'>Forgot Password</p>
        <form className="flex flex-col gap-3 justify-center items-center" onSubmit={handleSubmit}>
            <input type="email"
                placeholder="Your Email Address" 
                value={email}
                className="border-b-2 text-md font-light border-black focus:outline-none focus:ring-0 pl-1"
                onChange={ev => setEmail(ev.target.value)}></input>
            <button type="submit" className="border-2 text-md mt-1 pl-5 pr-5 pt-1 pb-1 border-[#061F2B] rounded-xl
            text-white hover:text-[#061F2B] bg-[#061F2B] hover:bg-transparent">Send Reset Email</button>
        </form>
    </div>
    </div>
  );
}

export default ForgotPassword;