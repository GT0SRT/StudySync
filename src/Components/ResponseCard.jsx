import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { deleteTask, updateCheckbox } from "./userTodos";

const ResponseCard = (props) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [tasks, setTasks] = useState(props.data.description);

  // Calculate completion %
  const completedCount = tasks.filter((t) => t.checkbox).length;
  const totalCount = tasks.length;
  const percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const toggleCheckbox = async (index) => {
    const newTasks = [...tasks];
    newTasks[index].checkbox = !newTasks[index].checkbox;
    setTasks(newTasks);

    const userId = getAuth().currentUser?.uid;
    const todoId = props.data.id;

    if (!userId || !todoId) return console.error("Missing userId or todoId");

    try {
      await updateCheckbox(userId, todoId, newTasks);
    } catch (err) {
      console.error("Failed to update checkbox:", err);
    }
  };

  const handleDelete = async (todoId) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return alert("User not logged in");

    await deleteTask(userId, todoId);
    setShowOverlay(false);
    window.location.reload();
  };

  return (
    <>
      {/* Card */}
      <div
        className="cursor-pointer w-[200px] p-2 bg-blue-800 rounded shadow-lg text-white text-center"
        onClick={() => setShowOverlay(true)}
      >
        <h2 className="text-xl font-bold mb-2">{props.data.title}</h2>
        <div className="text-lg">Completed: {percentage}%</div>
        <div className="w-full bg-blue-600 rounded h-3 mt-3 overflow-hidden">
          <div
            className="bg-green-400 h-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Overlay */}
      {showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setShowOverlay(false)}
        >
          <div
            className="bg-white text-black rounded-lg max-w-xl w-full max-h-[80vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-xl font-bold"
              onClick={() => setShowOverlay(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">{props.data.title}</h2>

            <ul className="space-y-4">
              {tasks.map((task, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between bg-gray-100 rounded p-3"
                >
                  <div>
                    <p className="font-semibold">Day {task.day}</p>
                    <p>{task.task}</p>
                    {/* <p className="text-sm text-gray-500">{task.date}</p> */}
                  </div>
                  <input
                    type="checkbox"
                    checked={task.checkbox}
                    onChange={() => toggleCheckbox(idx)}
                    className="w-5 h-5"
                  />
                </li>
              ))}
            </ul>
            <div onClick={() => handleDelete(props.data.id)} className="text-center mt-3 cursor-pointer" ><MdDelete className="inline text-red-600" size={25} />Delete</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResponseCard;