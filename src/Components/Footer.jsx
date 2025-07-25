import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="bg-gradient-to-t from-[#06202c] to-black text-white font-mono border-t-[6px] border-pink-300 rounded-[20px] p-10">
        <div className="flex flex-col items-center text-center">
          <div className="text-[2.5rem] font-[cursive]">study-sync</div>

          <div className="flex flex-col md:flex-row justify-center gap-[2rem] my-[30px]">
            <p className="text-sm text-gray-300 text-center md:w-1/2 mb-2">
                "Study Smarter Together! Sync Tasks, Share Notes & Boost Grades. Join Study Sync Now!"
            </p>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Features</h3>
              <ul className="list-none">
                <li className="text-sm"><Link to="/Todo">To-do list</Link></li>
                <li className="text-sm"><Link to="/Calendar">calendar</Link></li>
                <li className="text-sm"><Link to="/Upcoming">AI help</Link></li>
                <li className="text-sm"><Link to="/Upcoming">code editor</Link></li>
                <li className="text-sm"><Link to="/Collaborate">collaboration</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Company</h3>
              <ul className="list-none">
                <li className="text-sm"><Link to="/About">About Us</Link></li>
                <li className="text-sm"><Link to="/Help">Help Center</Link></li>
                <li className="text-sm">More..</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 mt-5">
            <a href='face' className='hover:scale-105'><FaFacebook size={30}/></a>
            <a href='insta' className='hover:scale-105'><FaInstagram size={30}/></a>
            <a href='pin' className='hover:scale-105'><FaPinterest size={30}/></a>
            <a href='twit' className='hover:scale-105'><FaTwitter size={30}/></a>
            <a href='link' className='hover:scale-105'><FaLinkedin size={30}/></a>
            <a href='yt' className='hover:scale-105'><FaYoutube size={30}/></a>
          </div>
        </div>
      </footer>
    </>
  )
}
export default Footer