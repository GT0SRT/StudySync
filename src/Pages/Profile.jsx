import React from "react";
import { auth } from "../Components/firebase";
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IoMdExit } from 'react-icons/io';
import { FaArrowLeft } from "react-icons/fa";

function Profile() {
    const userDetails = useSelector((state) => state.userDetails.user);
    const navigate = useNavigate();

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
    <div className="bg-gradient-to-r from-[#000000] via-[#0d222b] to-[#061F2B] min-h-screen p-5" >
    <FaArrowLeft onClick={() => navigate(-1)} className='text-white inline cursor-pointer hover:scale-105 mr-7 mb-1' size={25} />
    <div className="flex justify-center items-center  mt-[40%] md:mt-7">
      {userDetails ? (
        <>
          <main className="max-w-xl min-w-[80%] md:min-w-[50%] bg-white rounded-2xl shadow-md overflow-hidden border-2 border-white">
          {/* <!-- Cover image --> */}
          <div className="relative h-28 sm:h-36 bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-t-2xl overflow-hidden">
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0477d374-dae5-45ed-8c6d-74830089e530.png" 
              className="w-full h-full object-cover"
            ></img>
          </div>

          {/* <!-- Profile & user info --> */}
          <section className="relative px-6 m-7 sm:px-10 -mt-16 flex flex-col items-center text-center">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden">
              <img 
                src={userDetails.photo || "https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg"} 
                className="w-full h-full object-cover"
              ></img>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold mt-3 tracking-tight text-gray-900">{`${userDetails.firstName} ${userDetails.lastName}`}</h1>
            <p className="text-sm text-gray-500 mt-1">{userDetails.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-center gap-2 mt-2 text-gray-500 text-sm font-medium">
              <span>India</span>
              <span className="mx-1">&bull;</span>
              <span>Joined Jul 2025</span>
            </div>

            {/* <!-- Buttons --> */}
            <div className="flex items-center justify-center mt-1">
              <button onClick={handleLogout} className="bg-red-500 hover:bg-white text-white hover:text-red-500 p-1 text-sm rounded-lg border-2 border-red-500
              flex font-semibold m-2 transition-all">
              <IoMdExit className="mt-1 mr-1" size={20} />
                Logout
              </button>
            </div>
          </section>
        </main>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
}
export default Profile;