import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import deep from '../Assets/DeepSeek.svg';
import mainimg from '../Assets/main-img.svg';
import { FaCalendarAlt } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineGroup } from "react-icons/md";
import Upcoming from './Upcoming';
import { Link } from 'react-router-dom';

export const Landingpage = () => {
  const [showUpcoming, setShowUpcoming] = useState(false);
  return (
    <>
    <div className="bg-black text-white font-sans">
      <Navbar/>
      <main className="text-center mt-12 relative">
        <section className="flex flex-col items-center justify-center">
          <div className='flex w-screen'>
            <h1 className="text-4xl md:text-7xl font-bold italic mr-[400px] p-5 mt-12">Study, Grow & Collaborate</h1>
            <div className="h-[50%] w-[50%] ml-[50%] md:ml-[60%] mt-7 md:h-[32%] md:w-[32%] rounded-[20px] absolute"><img src={mainimg} href='emd' alt='main' /></div>
          </div>
          <div className='flex m-16 gap-7 md:mt-32'>
            <Link to="/Calendar">
            <div className='text-cyan-300 hover:cursor-pointer hover:scale-105 flex flex-col gap-2 justify-center items-center'>
                <FaCalendarAlt size={64}/>
                <p className='font-semibold text-xl text-white'>calendar</p>
            </div>
            </Link>
            <Link to="/chat">
            <div className='text-cyan-300 hover:cursor-pointer hover:scale-105 flex flex-col gap-2 justify-center items-center'>              
                <LuListTodo size={64}/>
                <p className='font-semibold text-xl text-white'>To-do list</p>
            </div>
            </Link>
            <Link to="/Collaborate">
            <div onClick={()=> setShowUpcoming(true)} className='text-cyan-300 hover:cursor-pointer hover:scale-105 flex flex-col gap-2 justify-center items-center'>
                <MdOutlineGroup size={64}/>
                <p className='font-semibold text-xl text-white'>collaborate</p>
            </div>
            </Link>
          </div>
        </section>

        <Link to={'/chat'}>
          <div className='mt-5 md:mt-12 p-7 flex flex-col md:flex-row mx-auto items-center justify-center'>
          <img src={deep} alt="StudySync Logo" className="w-[20vh] h-[20vh] md:w-[30vh] md:h-[30vh] m-5 p-3 rounded-full mb-2" />
          <section className="bg-[#222] cursor-pointer p-8 w-[80%] md:w-[40%] rounded-[20px] text-left">
            <h2 className="font-mono text-xl mb-2">Build, Code using AI</h2>
            <p className="text-sm text-gray-300">
              Collaborate on tasks, sync deadlines, and join AI-matched study groups. Get personalized productivity insights and shared notes.
              Perfect for students who want organized, efficient learning. Join now!
            </p>
          </section>
          </div>
        </Link>

      </main>

      <section className="bg-black text-white font-mono mt-[100px] px-5">
        <div className="flex flex-col items-center">
          <div className="mt-[50px] mb-[30px] text-lg">start where you left off ......</div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-[50px] mb-10">
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

          <div className="self-start mb-16 p-7 md:ml-[100px] mt-16 text-left">
            <h1 className="font-bold text-[30px] mb-2">Your workflow.<br />Your way.</h1>
            <div className='flex flex-col md:flex-row md:gap-64 gap-32'>
            <p className="text-[20px] text-gray-300 max-w-[300px]">
              All your projects, goals, calendars, roadmaps, and more—
              in one tool—personalized to how you and your team work.
            </p>
            <div className='mt-3 md:mt-24'><img className='h-64 w-96' src='https://th.bing.com/th/id/OIP.43WNBEH0ECirCUHw5K8zFgAAAA?w=448&h=901&rs=1&pid=ImgDetMain'></img></div>
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

    {showUpcoming && (
        <div className="fixed inset-0 z-5 flex items-center justify-center">
          <div onClick={()=> setShowUpcoming(false)} className='text-white p-3'><FaRegArrowAltCircleLeft className='hover:scale-105 hover:cursor-pointer' size={30}/></div>
          <Upcoming />
        </div>
      )}

    </>
  )
}
