import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import deep from '../Assets/DeepSeek.svg';
import mainimg from '../Assets/main-img.svg';
import { FaCalendarAlt } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineGroup } from "react-icons/md";
import Upcoming from './Upcoming';

export const Landingpage = () => {
  const [showUpcoming, setShowUpcoming] = useState(false);
  return (
    <>
    <div className="bg-black text-white font-sans">
      <Navbar/>
      <main className="text-center mt-16 relative">
        <section className="hero">
          <h1 className="text-2xl md:text-4xl font-bold italic mr-[400px] p-7 mt-12">Study, Grow & Collaborate</h1>
          <div className='flex m-16 gap-5 ml-[20%]'>
            <div className='text-cyan-300 hover:cursor-pointer hover:scale-105 flex flex-col gap-2 justify-center items-center'>
                <FaCalendarAlt size={50}/>
                <p className='font-semibold text-white'>calendar</p>
            </div>
            <div className='text-cyan-300 hover:cursor-pointer hover:scale-105 flex flex-col gap-2 justify-center items-center'>
                <LuListTodo size={50}/>
                <p className='font-semibold text-white'>to do list</p>
            </div>
            <div onClick={()=> setShowUpcoming(true)} className='text-cyan-300 hover:cursor-pointer hover:scale-105 flex flex-col gap-2 justify-center items-center'>
                <MdOutlineGroup size={50}/>
                <p className='font-semibold text-white'>collaborate</p>
            </div>
          </div>
          <div className="h-[25%] w-[25%] rounded-[20px] absolute top-5 right-[100px]"><img src={mainimg} href='emd' alt='main' /></div>
        </section>

        <div className='mt-20 md:mt-36 p-7 flex flex-col md:flex-row mx-auto items-center justify-center'>
        <img src={deep} alt="StudySync Logo" className="w-[20vh] h-[20vh] md:w-[30vh] md:h-[30vh] m-5 p-3 rounded-full mb-2" />
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
>>>>>>> 66ec013 (Initial commit)
