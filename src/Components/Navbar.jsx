import React from 'react';
import { CgProfile } from "react-icons/cg";
import profile from '../Assets/profile.png';
import bell from '../Assets/bell-svgrepo-com.svg';
import { Link } from 'react-router-dom';
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
        <header className="flex justify-between items-center p-5">
        <div className="text-4xl font-bold font-[cursive]">study-sync</div>
        <nav className="flex space-x-2">
          <button className="bg-[#c9a974] hidden md:block text-sm px-3 py-2 rounded-lg"><Link to="/Productivity">productivity</Link></button>
          <button className="bg-[#c9a974] hidden md:block text-sm px-3 py-2 rounded-lg"><Link to="/Collaboration">collaboration</Link></button>
          <button className="bg-[#c9a974] hidden md:block text-sm px-3 py-2 rounded-lg"><Link to="/Pricing">pricing</Link></button>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="rounded-full flex items-center justify-center">
            <FaBell className="w-7 h-7 rotate-45 text-cyan-300" />
          </div>
          <button className="bg-gray-500 text-white px-3 py-2 rounded-3xl">log in</button>
          <img src={profile} alt="User Icon" className="w-10 h-10 rounded-full ml-2" />
        </div>
        </header>
    </>
  )
}
export default Navbar