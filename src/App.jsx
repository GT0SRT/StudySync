import { } from 'react'
import './App.css'
import { Landingpage } from './Pages/Landingpage';
import Upcoming from './Pages/Upcoming';
import { Routes, Route } from 'react-router-dom';
import Calendar from './Pages/Calendar';
import Collaborate from './Pages/Collaborate';
import Todo from './Pages/Todo';
import About from './Pages/About';
import Help from './Pages/Help';
import Pricing from './Pages/Pricing';
import Productivity from './Pages/Productivity';
import DisplayTodos from './Components/DisplayTodos';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/About" element={<><About /><Upcoming/></>} />
        <Route path="/Calendar" element={<><Calendar /><Upcoming/></>} />
        <Route path="/Collaborate" element={<><Collaborate /><Upcoming/></>} />
        <Route path="/Pricing" element={<><Pricing /><Upcoming/></>} />
        <Route path="/Productivity" element={<><Productivity /><Upcoming/></>} />
        <Route path="/Help" element={<><Help /><Upcoming/></>} />
        <Route path="/Todo" element={<div className='bg-black min-h-screen'><Todo /><DisplayTodos/></div>} />
    </Routes>
  )
}

export default App
