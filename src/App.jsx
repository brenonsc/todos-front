import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import SignUp from "./pages/signup/SignUp.js";
import AddTodo from "./pages/addToDo/AddTodo";
import EditTodo from "./pages/editTodo/EditTodo";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Toaster />
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/edit/:id" element={<EditTodo />} />
                    <Route path="/add" element={<AddTodo />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;