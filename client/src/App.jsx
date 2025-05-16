import React from 'react'

import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './components/Home';
import Index from './components/Index';
import Layout from './components/Layout';

const App = () => {

  return (
    <div className='m-4 p-4'>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/index" element={<Layout />} >
          <Route path="" element={<Index />} />
        </Route>   
      </Routes> 
    </div>
  )
}

export default App
