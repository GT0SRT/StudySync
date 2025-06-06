import { motion } from "framer-motion";
import React, { useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;

  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    if (e.which === 13) {
      //here 13 is key code for enter key
      updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
  };
  return (
    <motion.li
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      whileHover={{
        scale: 0.9,
        transition: { type: "spring", duration: 0.1 },
      }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item.id}
      className="flex flex-col bg-[#06212C] p-3 gap-2 rounded-lg"
    >
      <input
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item.todo}
        className="min-w-[5rem] w-36 md:w-[25vw] max-h-[2.5rem] bg-[#e1ebfd] text-black text-lg border-none rounded-md px-3 py-1 focus:outline-none focus:border-2 focus:border-[#433aa8]"
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
      />
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item.todoDes}
        className="min-w-[5rem] w-36 md:w-[25vw] h-32 bg-[#e1ebfd] text-black text-lg border-none rounded-md px-4 py-1 focus:outline-none focus:border-2 focus:border-[#433aa8] resize-none"
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
      />
      <div className="flex">
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeFocus()}
          className="w-1/3 flex justify-center text-white items-center"
        >
          {" "}
          <AiFillEdit size={30}/>{" "}
        </motion.button>
        {item.completed === false && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={() => completeTodo(item.id)}
            className="w-1/3 flex justify-center items-center"
          >
            <IoCheckmarkDoneSharp size={30}/>
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => removeTodo(item.id)}
          className="w-1/3 flex justify-center items-center"
        >
          {" "}
          <IoClose size={30}/>
        </motion.button>{" "}
      </div>
      {item.completed && <span className="completed">done</span>}
    </motion.li>
  );
};

export default TodoItem;