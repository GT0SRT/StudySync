import React, { useState } from 'react'
import loginImg from "../Assets/Login.svg";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import SignInwithGoogle from '../Components/signInwithGoogle';
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from "../Components/firebase";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in Successfully");
            navigate('//');
            toast.success("User logged in Successfully", {
                position: "top-center",
                autoClose: 3000,
            });
        } catch (error) {
            console.log(error.message);

            toast.error(error.message, {
                position: "bottom-center",
                autoClose: 3000,
            });
        }
    };

  return (
    <>
        <div className='bg-gradient-to-r from-[#0d222b] via-[#061F2B] to-[#0C4861] min-h-screen p-7 flex items-center justify-center'>
            <div className='w-1/2 m-3 p-3 hidden md:block'>
                <img src={loginImg} className='h-[60vh]'></img>
                <h1 style={{ fontFamily: '"Leckerli One", cursive' }} className='text-white font-extralight text-2xl m-3'>Welcome, unlock your full potential.</h1>
            </div>
            <div className='bg-white md:w-1/3 rounded-xl flex flex-col p-3 items-center justify-center'>
                <h1 style={{ fontFamily: '"Leckerli One", cursive' }} className='font-extralight mb-12 text-2xl m-3'>StudySync</h1>
                <p className='p-3 text-lg'>Welcome to StudySync</p>
                <form className="flex flex-col gap-3 justify-center items-center" onSubmit={handleSubmit}>
                <input type="email"
                    placeholder="Email or Username" 
                    value={email}
                    className="border-b-2 text-md font-light border-black focus:outline-none focus:ring-0 pl-1"
                    onChange={ev => setEmail(ev.target.value)}></input>
                <input type="password" 
                    placeholder="Password"
                    value={password}
                    className="border-b-2 text-md font-light border-black focus:outline-none focus:ring-0 pl-1"
                    onChange={ev => setPassword(ev.target.value)}></input>
                <p className='text-sm ml-auto text-red-600'><Link to='/forgotpassword'>Forgot Password ?</Link></p>
                <button className="border-2 text-md mt-1 pl-5 pr-5 pt-1 pb-1 border-[#061F2B] rounded-xl
                text-white hover:text-[#061F2B] bg-[#061F2B] hover:bg-transparent">Login</button>
            </form>
            <p>or</p>
            <SignInwithGoogle />
            <div className='flex pt-3 pb-2'>
                <p>Don't have an account ?</p>
                <Link to='/signup' className='pl-1 text-[#3131e7] hover:underline'> signup</Link>
            </div>
            </div>
        </div>
    </>
  )
}

export default Login