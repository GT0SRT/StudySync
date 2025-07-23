import React, { useState } from 'react'
import { GoPlus } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todo = (props) => {
  const [todo, setTodo] = useState("");
  const [tododes, setTodoDes] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleChangeDes = (e) => {
    setTodoDes(e.target.value);
  };

  const add = () => {
    if (todo === "") {
      alert("something is Missing");
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: {todo,tododes},
        completed: false,
      });
      setTodo("");
      setTodoDes("");
    }
  };

  return (
    <div className='text-white bg-black text-4xl font-bold text-center p-7'>
      <div className="flex justify-center">
      <h1 className='p-4 m-3'>My TODO</h1>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 m-5 border-2 rounded-full"
        onClick={() => add()}
      >
        <GoPlus />
      </motion.button>
    </div>
    <div className='flex flex-col items-center justify-center gap-5 p-3 m-3'>
        <input
          type="text"
          onChange={handleChange}
          value={todo}
          className="min-w-[15rem] w-96 md:w-[40vw] max-h-[2.5rem] bg-[#e1ebfd] text-black text-lg border-none rounded-md px-4 py-2 focus:outline-none focus:border-2 focus:border-[#433aa8]"
          placeholder='Title'
        />
        <textarea
          onChange={handleChangeDes}
          value={tododes}
          className="min-w-[15rem] w-96 md:w-[40vw] h-32 bg-[#e1ebfd] text-black text-lg border-none rounded-md px-4 py-2 focus:outline-none focus:border-2 focus:border-[#433aa8] resize-none"
          placeholder="Description"
        />
      </div>

    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);