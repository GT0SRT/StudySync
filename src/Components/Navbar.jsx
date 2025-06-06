import React from 'react';
import { CgProfile } from "react-icons/cg";
import profile from '../Assets/profile.png';
import bell from '../Assets/bell-svgrepo-com.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
        <header className="flex justify-between items-center p-5">
        <div className="text-2xl font-[cursive]">study-sync</div>
        <nav className="flex space-x-2">
          <button className="bg-[#c9a974] hidden md:block text-sm px-3 py-2 rounded-lg"><Link to="/Productivity">productivity</Link></button>
          <button className="bg-[#c9a974] hidden md:block text-sm px-3 py-2 rounded-lg"><Link to="/Collaboration">collaboration</Link></button>
          <button className="bg-[#c9a974] hidden md:block text-sm px-3 py-2 rounded-lg"><Link to="/Pricing">pricing</Link></button>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 bg-[#c9a974] rounded-full flex items-center justify-center">
            <img src={bell} alt="Notification Bell" className="w-4 h-4" />
          </div>
          <button className="bg-gray-500 text-white px-3 py-2 rounded-full">log in</button>
          <img src={profile} alt="User Icon" className="w-10 h-10 rounded-full ml-2" />
        </div>
        </header>
    </>
  )
}
export default Navbar