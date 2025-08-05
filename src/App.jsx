import { useEffect } from 'react'
import './App.css'
import { Landingpage } from './Pages/Landingpage';
// import Upcoming from './Pages/Upcoming';
import { Routes, Route } from 'react-router-dom';
// import Calendar from './Pages/Calendar';
// import Collaborate from './Pages/Collaborate';
import Todo from './Pages/Todo2';
import About from './Pages/About';
// import Help from './Pages/Help';
// import Pricing from './Pages/Pricing';
// import Productivity from './Pages/Productivity';
// import DisplayTodos from './Components/DisplayTodos';
import Chatbot from './Pages/sample_bot';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Components/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Pages/Profile';
import { auth, db } from "./Components/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './redux/userDetailsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(setUser(docSnap.data()));
        } else {
          dispatch(clearUser());
        }
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
    <Routes>
        <Route path="/" element={<Landingpage />} />
        {/* <Route path="/upcoming" element={<Upcoming />} /> */}
        {/* <Route path="/About" element={<><About /><Upcoming/></>} /> */}
        {/* <Route path="/Calendar" element={<PrivateRoute><Calendar /><Upcoming/></PrivateRoute>} />
        <Route path="/Collaborate" element={<PrivateRoute><Collaborate /><Upcoming/></PrivateRoute>} /> */}
        {/* <Route path="/Pricing" element={<><Pricing /><Upcoming/></>} /> */}
        {/* <Route path="/Productivity" element={<PrivateRoute><Productivity /><Upcoming/></PrivateRoute>} /> */}
        {/* <Route path="/Help" element={<><Help /><Upcoming/></>} /> */}
        <Route path="/Todo" element={<PrivateRoute><Todo /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
