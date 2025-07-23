import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell } from "react-icons/fa";
import { IoMdExit } from 'react-icons/io';
import { signOut } from "firebase/auth";
import { auth, db } from "../Components/firebase";
import { toast } from "react-toastify";
import { doc, getDoc } from 'firebase/firestore';

const Navbar = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        console.log(user);
  
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("User is not logged in");
        }
      });
    };
    useEffect(() => {
      fetchUserData();
    }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!", { position: "top-center" });
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed: " + error.message, { position: "bottom-center" });
    }
  };

  return (
    <>
      <header className="flex justify-between items-center p-5">
        <div className="text-4xl font-bold font-[cursive]">study-sync</div>

        <nav className="flex space-x-2">
          <button className="bg-[#c9a974] hidden md:block text-sm px-3 py-2 rounded-lg">
            <Link to="/Productivity">productivity</Link>
          </button>
          <button className="bg-[#c9a974] hidden md:block text-sm px-3 py-2 rounded-lg">
            <Link to="/Collaboration">collaboration</Link>
          </button>
          <button className="bg-[#c9a974] hidden md:block text-sm px-3 py-2 rounded-lg">
            <Link to="/Pricing">pricing</Link>
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Profile Dropdown */}
          {
            userDetails ? (
              <>
              <div className="rounded-full cursor-pointer flex items-center justify-center">
                <FaBell className="w-7 h-7 rotate-45 text-cyan-300" />
              </div>
              <div className="group relative">
              <img
                src={userDetails.photo || 'https://cdn-icons-png.flaticon.com/512/8792/8792047.png'}
                alt="User Icon"
                className="w-10 h-10 rounded-full ml-2 cursor-pointer"
              />
              <div
                className="flex flex-col items-center justify-center opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-500 ease-in-out transform -translate-y-2 absolute top-full -left-20 mt-2
                bg-white w-36 p-2 shadow-md rounded-md shadow-black z-50"
              >
                <p className="text-black text-lg font-semibold hover:cursor-pointer hover:scale-105 transition-all">
                  <Link to={"/profile"}>My Profile</Link>
                </p>
                <div className="flex items-center justify-center">
                  <button onClick={handleLogout} className="bg-red-500 hover:bg-white text-white hover:text-red-500 p-1 text-sm rounded-lg border-2 border-red-500
                    flex font-semibold m-2 transition-all">
                    <IoMdExit className="mt-1 mr-1" size={20} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </>
            ):(
              <button className="bg-cyan-300 hover:scale-105 text-[#0d222b] px-3 py-2 rounded-2xl">
                <Link to="/login">Login</Link>
              </button>
            )
          }
        </div>
      </header>
    </>
  );
};

export default Navbar;