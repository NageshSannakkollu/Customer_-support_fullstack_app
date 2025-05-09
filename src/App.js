import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import NotFound from './components/NotFound'
import { Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ChatPage from './components/ChatPage'

const App = () => (
  <BrowserRouter>
  <ToastContainer position='top-center' autoClose={600} hideProgressBar={true} transition={Slide}/>
    <Routes>
      <Route exact path="/" element={<LandingPage/>} />
      <Route exact path='/login' element={<LoginPage/>} />
      <Route exact path='/register' element={<RegisterPage/>}/>
      <Route exact path='/chat' element={<ChatPage/>} />
      <Route path='/*' element={<NotFound/>} />
    </Routes>
  </BrowserRouter>
  )


export default App