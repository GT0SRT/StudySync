import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from './firebase';
import { toast } from 'react-toastify';
import { setDoc, doc } from 'firebase/firestore';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';

const SignInWithGoogle = () => {
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: '',
        });

        toast.success('User logged in successfully', {
          position: 'top-center',
        });

        window.location.href = '/profile';
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Login failed. Please try again.', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="text-center">
      <button onClick={googleLogin} className="border-2 text-sm mt-1 pl-3 pr-3 pt-1 pb-1 border-[#0C4861] rounded-xl
      text-white hover:text-[#0C4861] bg-[#0C4861] hover:bg-transparent"><FcGoogle size={15} className='inline mr-2 mb-1'/>signin with Google</button>
    </div>
  );
};

export default SignInWithGoogle;