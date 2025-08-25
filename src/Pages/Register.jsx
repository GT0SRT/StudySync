import React, { useState } from 'react'
import loginImg from "../Assets/Login.svg";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from "../Components/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import SignInwithGoogle from '../Components/signInwithGoogle';

const Register = () => {
    const [fname, setFname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                firstName: fname,
                lastName: lname,
                photo:""
                });
            }
            await sendEmailVerification(user);
            console.log("Verification Email Sent Successfully!!");
            toast.success("Verification Email Sent Successfully!! please verify Before login", {
                autoClose: 3000,
            });
            navigate('/login');
        } catch (error) {
            console.log(error.message);
            toast.error(error.message, {
                position: "bottom-center",
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
                <form className="flex flex-col gap-3 justify-center items-center" onSubmit={handleRegister}>
                <input type="name"
                    placeholder="First Name" 
                    value={fname}
                    className="border-b-2 text-md font-light border-black focus:outline-none focus:ring-0 pl-1"
                    onChange={ev => setFname(ev.target.value)}></input>
                <input type="name"
                    placeholder="Last Name" 
                    value={lname}
                    className="border-b-2 text-md font-light border-black focus:outline-none focus:ring-0 pl-1"
                    onChange={ev => setlname(ev.target.value)}></input>
                <input type="email"
                    placeholder="Email Address" 
                    value={email}
                    className="border-b-2 text-md font-light border-black focus:outline-none focus:ring-0 pl-1"
                    onChange={ev => setEmail(ev.target.value)}></input>
                <input type="password" 
                    placeholder="Password"
                    value={password}
                    className="border-b-2 text-md font-light border-black focus:outline-none focus:ring-0 pl-1"
                    onChange={ev => setPassword(ev.target.value)}></input>
                <button className="border-2 text-md mt-1 pl-5 pr-5 pt-1 pb-1 border-[#061F2B] rounded-xl
                text-white hover:text-[#061F2B] bg-[#061F2B] hover:bg-transparent">signup</button>
            </form>
            {
                window.innerWidth <= 450 ? (<></>):
                (<><p>or</p><SignInwithGoogle/></>)
            }
            <div className='flex pt-3 pb-2'>
                <p>Already have an account ?</p>
                <Link to='/Login' className='pl-1 text-[#3131e7] hover:underline'> Login</Link>
            </div>
            </div>
        </div>
    </>
  )
}

export default Register
