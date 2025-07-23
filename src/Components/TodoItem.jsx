import React from "react";
import { ImCheckmark } from "react-icons/im";
import { FaAngleDown } from "react-icons/fa";

const TodoItem = ({ item, completeTodo, setSelectedTodo }) => {
  return (
    <div className="bg-[#989898] rounded-lg w-[40vh] flex-col p-3 relative">
      <div className="flex items-center">
        <div className="text-green-500 p-1 cursor-pointer w-7 h-7 bg-white rounded-sm"
          onClick={() => completeTodo(item.id)}>
          <ImCheckmark className={item.completed ? "" : "hidden"} size={20} />
        </div>
        <h1 className="text-lg pl-5 font-bold cursor-pointer" onClick={() => setSelectedTodo(item)}>{item.item.title}</h1>
      </div>
    </div>
  );
};

export default TodoItem;