import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import SignUp from "./pages/signup/SignUp.js";
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
                </Routes>
            </Router>
        </>
    );
}

export default App;