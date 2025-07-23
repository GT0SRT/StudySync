import React, { useState } from 'react';
import { IoAdd } from "react-icons/io5";
import DisplayTodos from './../Components/DisplayTodos';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addTodos } from '../redux/reducer';

const Todo = () => {
  const userDetails = useSelector((state) => state.userDetails.userDetails);
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDes, setTaskDes] = useState("");
  const navigate = useNavigate();

  const add = () => {
    if (taskTitle.trim() === "" || taskDes.trim() === "") {
      alert("Please enter both title and description.");
    } else {
      dispatch(
        addTodos({
          id: Date.now(),
          item: {
            userId: userDetails.email,
            title: taskTitle,
            description: taskDes,
          },
          completed: false,
        })
      );
      setTaskTitle("");
      setTaskDes("");
    }
  };

  return (
    <>
      <div className='bg-[#061F2B] min-h-[96vh] rounded-xl m-3 p-7'>
        <h1 className='text-white font-bold text-xl'>
          <FaArrowLeft onClick={() => navigate(-1)} className='text-white inline cursor-pointer hover:scale-105 mr-7 mb-1' size={25} />
          Hey {userDetails ? userDetails.firstName : "Guest"}
        </h1>

        <div className='flex flex-col md:flex-row mt-12 w-[100%]'>
          <div className='md:w-1/4 md:border-r-2 border-white md:min-h-[70vh] h-[80%] flex flex-col mb-auto items-center justify-center'>
            <h1 className='text-white font-extrabold text-3xl p-5 mb-3'>Add Task</h1>

            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              className="border-b-2 mb-5 text-white text-lg font-light bg-transparent border-white focus:outline-none focus:ring-0 pl-1"
              onChange={(ev) => setTaskTitle(ev.target.value)}
            />

            <textarea
              onChange={(ev) => setTaskDes(ev.target.value)}
              value={taskDes}
              className="h-32 mb-7 bg-[#e1ebfd] text-black text-lg border-none rounded-md px-4 py-2 focus:outline-none focus:border-2 focus:border-[#433aa8] resize-none"
              placeholder="Description"
            />

            <div className='flex items-center justify-center'>
              <div onClick={add} className='bg-cyan-300 h-12 cursor-pointer w-12 rounded-full flex items-center justify-center hover:scale-105'>
                <IoAdd className='font-extrabold' size={30} />
              </div>
              <div className='text-white font-bold text-xl p-3 w-1/2'>Add</div>
            </div>
          </div>

          <div className='md:w-3/4'>
            <DisplayTodos />
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;