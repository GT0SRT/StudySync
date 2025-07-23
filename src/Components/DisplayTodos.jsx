import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { completeTodos, removeTodos, updateTodos, reorderTodos } from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillEdit } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const DisplayTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [sort, setSort] = useState("active");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const startEditing = () => {
    setNewTitle(selectedTodo.item.title);
    setNewDescription(selectedTodo.item.description || "");
    setEditMode(true);
  };

  const saveChanges = () => {
    if (!newTitle.trim()) return;
    dispatch(updateTodos({
      id: selectedTodo.id,
      item: {
        title: newTitle,
        description: newDescription,
      },
    }));
    setSelectedTodo(null);
    setEditMode(false);
    toast.success("Todo updated!", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  const filteredTodos = todos.filter((item) => {
    if (sort === "active") return !item.completed;
    if (sort === "completed") return item.completed;
    return true;
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newTodos = Array.from(filteredTodos);
    const [movedItem] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, movedItem);

    if (sort === "all") {
      dispatch(reorderTodos(newTodos));
    } else {
      const otherTodos = todos.filter(
        (t) => !filteredTodos.some((f) => f.id === t.id)
      );
      const mergedTodos =
        sort === "active"
          ? [...newTodos, ...otherTodos.filter((t) => t.completed)]
          : [...otherTodos.filter((t) => !t.completed), ...newTodos];

      dispatch(reorderTodos(mergedTodos));
    }
  };

  return (
    <div className="pt-7 flex flex-col items-center">
      <div className="flex gap-3">
        {["active", "completed", "all"].map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSort(type)}
            className="px-4 py-2 text-lg rounded-full bg-white text-[#271c6c] font-semibold shadow hover:shadow-lg transition"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todosDroppable" direction="vertical">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-wrap gap-5 p-3 m-7 md:m-12 md:mt-7"
            >
              <AnimatePresence>
                {filteredTodos.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-[40vh]"
                      >
                        <TodoItem
                          item={item}
                          setSelectedTodo={setSelectedTodo}
                          removeTodo={(id) => dispatch(removeTodos(id))}
                          updateTodo={(obj) => dispatch(updateTodos(obj))}
                          completeTodo={(id) => dispatch(completeTodos(id))}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </AnimatePresence>
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {selectedTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90vw] max-w-md max-h-[90vh] overflow-y-auto p-6 rounded-lg relative shadow-xl">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
              onClick={() => {
                setSelectedTodo(null);
                setEditMode(false);
              }}
            >
              <IoClose size={24} />
            </button>

            <div className="flex items-center justify-between mt-3 mb-4">
              {editMode ? (
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="text-xl font-bold border border-gray-300 p-2 rounded w-full"
                />
              ) : (
                <h2 className="text-xl font-bold">{selectedTodo.item.title}</h2>
              )}
            </div>

            {editMode ? (
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded text-sm min-h-[40vh]"
              />
            ) : (
              <p className="text-gray-700 min-h-24">
                {selectedTodo.item.description || "No description"}
              </p>
            )}

            {editMode ? (
              <div className="flex gap-3 justify-end mt-4">
                <button
                  onClick={saveChanges}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex mt-5">
                <div
                  onClick={startEditing}
                  className="flex cursor-pointer gap-2 w-1/2 items-center justify-center"
                >
                  <AiFillEdit size={20} className="text-blue-600" />
                  <div className="text-lg">Edit</div>
                </div>
                <div
                  onClick={() => {
                    dispatch(removeTodos(selectedTodo.id));
                    setSelectedTodo(null);
                    toast.success("Deleted successfully!", {
                      position: "top-center",
                      autoClose: 1000,
                    });
                  }}
                  className="flex cursor-pointer gap-2 w-1/2 items-center justify-center"
                >
                  <RiDeleteBin6Fill size={20} className="text-red-500" />
                  <div className="text-lg">Delete</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayTodos;