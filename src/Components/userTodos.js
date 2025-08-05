import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { toast } from 'react-toastify';

export const addTodo = async (userId, todo) => {
  try {
    const todosRef = collection(db, "userTodos", userId, "todos");
    await addDoc(todosRef, todo);
    toast.success('Todos saved successfully!', { autoclose: 2000});
  } catch (error) {
    console.error(error);
  }
};

export const getUserTodos = async (userId) => {
  try {
    const todosRef = collection(db, "userTodos", userId, "todos");
    const snapshot = await getDocs(todosRef);

    const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return todos;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateCheckbox = async (userId, todoId, updatedDescription) => {
  try {
    const todoRef = doc(db, "userTodos", userId, "todos", todoId);
    await updateDoc(todoRef, {
      description: updatedDescription,
    });
    console.log('Todos updated!');
  } catch (error) {
    console.error(error);
    toast.error('Failed to update todos');
  }
};

export const deleteTask = async (userId, todoId) => {
  try {
    const todoRef = doc(db, "userTodos", userId, "todos", todoId);
    await deleteDoc(todoRef);
    toast.success('Todos deleted successfully!!', {autoclose: 2000});
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
