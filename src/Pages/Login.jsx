import React, { useState } from 'react';
import loginImg from "../Assets/login.svg";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../Components/firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "../Components/signInWithGoogle";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await auth.signOut();
        toast.error("Please verify your email before logging in.", {
          position: "top-center",
        });
        return;
      }

      toast.success("User logged in successfully!", {
        position: "top-center",
      });

      navigate("//");
    } catch (error) {
      console.log(error.message);
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
            <img src={loginImg} className='h-[60vh]' />
            <h1 style={{ fontFamily: '"Leckerli One", cursive' }} className='text-white font-extralight text-2xl m-3'>
              Welcome, unlock your full potential.
            </h1>
          </div>
          <div className='bg-white md:w-1/3 rounded-xl flex flex-col p-3 items-center justify-center'>
            <h1 style={{ fontFamily: '"Leckerli One", cursive' }} className='font-extralight mb-12 text-2xl m-3'>StudySync</h1>
            <p className='p-3 text-lg'>Welcome to StudySync</p>
            <form className="flex flex-col gap-0 justify-center items-center" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                className="border-b-2 mb-3 text-md font-light border-black focus:outline-none focus:ring-0 pl-1"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                className="border-b-2 text-md font-light border-black focus:outline-none focus:ring-0 pl-1"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className='ml-auto text-red-600 cursor-pointer text-sm mb-3'>
                <Link to="/forgotpassword">Forgot Password?</Link>
              </p>
              <button
                type='submit'
                className="border-2 text-md mt-1 pl-5 pr-5 pt-1 pb-1 border-[#0C4861] rounded-xl
                text-white hover:text-[#0C4861] bg-[#0C4861] hover:bg-transparent"
              >
                Login
              </button>
            </form>
            <p className='mt-3 mb-3'>or</p>
            <div className='mb-3 flex flex-col items-center justify-center'>
              <SignInwithGoogle />
              <p className='text-red-600 cursor-pointer text-sm text-center p-3'>
                <Link to="/signup">Don't Have Account? Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;