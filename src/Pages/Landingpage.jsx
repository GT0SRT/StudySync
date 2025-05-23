import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import deep from '../Assets/DeepSeek.svg';
import mainimg from '../Assets/main-img.svg';
import { FaCalendarAlt } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineGroup } from "react-icons/md";

export const Landingpage = () => {
  return (
    <>
    <div className="bg-black text-white font-sans">
      <Navbar/>
      <main className="text-center mt-12 relative">
        <section className="hero">
          <h1 className="text-2xl md:text-4xl font-bold italic mr-[400px] mt-12">Study, Grow & Collaborate</h1>
          <div className='flex m-16 gap-5 ml-[20%]'>
            <div className='text-cyan-300 hover:cursor-pointer hover:scale-105 flex flex-col gap-2 justify-center items-center'>
                <FaCalendarAlt size={50}/>
                <p className='font-semibold text-white'>calendar</p>
            </div>
            <div className='text-cyan-300 hover:cursor-pointer hover:scale-105 flex flex-col gap-2 justify-center items-center'>
                <LuListTodo size={50}/>
                <p className='font-semibold text-white'>to do list</p>
            </div>
            <div className='text-cyan-300 hover:cursor-pointer hover:scale-105 flex flex-col gap-2 justify-center items-center'>
                <MdOutlineGroup size={50}/>
                <p className='font-semibold text-white'>collaborate</p>
            </div>
          </div>
          <div className="h-[25%] w-[25%] rounded-[20px] absolute top-5 right-[100px]"><img src={mainimg} href='emd' alt='main' /></div>
        </section>

        <div className='mt-36 p-7 flex flex-col md:flex-row mx-auto items-center justify-center'>
        <img src={deep} alt="StudySync Logo" className="w-[30vh] h-[30vh] m-5 p-3 rounded-full mb-2" />
        <section className="bg-[#222] p-8 w-[80%] md:w-[40%] rounded-[20px] text-left">
          <h2 className="font-mono text-xl mb-2">Build, Code using AI</h2>
          <p className="text-sm text-gray-300">
            Collaborate on tasks, sync deadlines, and join AI-matched study groups. Get personalized productivity insights and shared notes.
            Perfect for students who want organized, efficient learning. Join now!
          </p>
        </section>
        </div>
      </main>

      <section className="bg-black text-white font-mono mt-[100px] px-5">
        <div className="flex flex-col items-center">
          <div className="mt-[50px] mb-[30px] text-lg">start where you left off ......</div>

          <div className="flex justify-center items-center gap-[50px] mb-10">
            <div className="bg-[#0b3d56] w-[200px] h-[150px] p-5 rounded-[20px] text-lg text-center">tab 1</div>
            <div className="w-[180px] h-[100px] bg-gray-300 border-[3px] border-black rounded-[10px] relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-1/2 
                w-0 h-0 border-l-[20px] border-l-teal-500 
                border-t-[12px] border-t-transparent 
                border-b-[12px] border-b-transparent">
              </div>
            </div>
            <div className="bg-[#0b3d56] w-[200px] h-[150px] p-5 rounded-[20px] text-lg text-center">tab 2</div>
          </div>

          <div className="self-start ml-[100px] mb-[30px] text-left">
            <h1 className="font-bold text-[30px] mb-2">Your workflow.<br />Your way.</h1>
            <p className="text-[20px] text-gray-300 max-w-[300px]">
              All your projects, goals, calendars, roadmaps, and more—
              in one tool—personalized to how you and your team work.
            </p>
          </div>

          <div className="bg-[#8b4c4c] w-[400px] h-[300px] rounded-[10px] ml-[600px] mt-[-100px] mb-[50px] flex justify-center items-center relative">
            <div className="font-bold text-[18px] text-center">
              screenshot of the<br />to do list
            </div>
          </div>

          <div className="text-[18px] text-center mb-5">Kickstart your next project with Studysync</div>

          <div className="flex flex-wrap gap-2 justify-center">
            {["Accounting tasks", "Educational", "Client meeting", "Management", "Organiser", "Collaborative work"].map(tag => (
              <div key={tag} className="bg-[#333] px-4 py-1 rounded-[10px] text-xs">{tag}</div>
            ))}
          </div>

          <p className="text-xl font-bold mt-[50px] text-center mb-3">A task manager you can trust for life.</p>
        </div>
      </section>
      <Footer/>
    </div>
    </>
  )
}
