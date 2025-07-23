import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

import loginImg from "../Assets/login.svg";
import SignInWithGoogle from '../Components/signInWithGoogle';
import { auth, db } from "../Components/firebase";

const Register = () => {
    const [fname, setfName] = useState("");
    const [lname, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                await sendEmailVerification(user);

                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: fname,
                    lastName: lname,
                    photo: ""
                });

                toast.success("Verification email sent and user registered successfully!", {
                    position: "top-center",
                });

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message, {
                position: "bottom-center",
            });
        }
    };

    return (
        <div className='bg-gradient-to-r from-[#0d222b] via-[#061F2B] to-[#0C4861] min-h-screen p-7'>
            <div className='flex items-center justify-center'>
                <div className='w-1/2 m-3 p-3 hidden md:block'>
                    <img src={loginImg} className='h-[60vh]' alt="Login" />
                    <h1 style={{ fontFamily: '"Leckerli One", cursive' }} className='text-white font-extralight text-2xl m-3'>
                        Welcome, unlock your full potential.
                    </h1>
                </div>

                <div className='bg-white md:w-1/3 rounded-xl flex flex-col p-3 items-center justify-center'>
                    <h1 style={{ fontFamily: '"Leckerli One", cursive' }} className='font-extralight mb-12 text-2xl m-3'>StudySync</h1>
                    <p className='p-3 text-lg'>Welcome to StudySync</p>
                    
                    <form className="flex flex-col gap-0 justify-center items-center" onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={fname}
                            className="border-b-2 mb-3 text-md font-light border-black focus:outline-none focus:ring-0 pl-1"
                            onChange={e => setfName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lname}
                            className="border-b-2 mb-3 text-md font-light border-black focus:outline-none focus:ring-0 pl-1"
                            onChange={e => setlName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            className="border-b-2 mb-3 text-md font-light border-black focus:outline-none focus:ring-0 pl-1"
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            className="border-b-2 mb-3 text-md font-light border-black focus:outline-none focus:ring-0 pl-1"
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="border-2 text-md mt-1 pl-5 pr-5 pt-1 pb-1 border-[#0C4861] rounded-xl text-white hover:text-[#0C4861] bg-[#0C4861] hover:bg-transparent"
                        >
                            Signup
                        </button>
                    </form>

                    <p className='mt-3 mb-3'>or</p>
                    <div className='mb-3 flex flex-col items-center justify-center'>
                        <SignInWithGoogle />
                        <p className='text-red-600 cursor-pointer text-sm text-center p-3'>
                            <Link to="/login">Already Have Account? Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;