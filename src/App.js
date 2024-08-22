import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import SetAvatar from './pages/SetAvatar.jsx';
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setavatar" element={<SetAvatar />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App