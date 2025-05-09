import React from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'

import "./index.css"
import { Link, useNavigate } from 'react-router-dom'
const LandingPage = () => {
  // const jwtToken = Cookies.get('jwtToken')
  // const navigate = useNavigate()
  // if(jwtToken === undefined){
  //   navigate("/login")
  // }
  return (
    <div className='landing_page_main_container'>
        <Header/>
        <div className='landing_page_inside_container'>
              <h1 className='first_heading_title'>Innovative solutions to stay ahead of the competition</h1>
              <p className='first_para_title'>Professional services that deliver exceptional quality, reliability, and customer service to exceed your expectations.</p>
            
              <p>This is Chatbot. Let Ask Something, You need?</p>
              <Link to="/chat">
                  <button type='button' className='chat_with_bot_button'>Chat With Chatbot</button>
              </Link>
              <div className='chat_bot_image_container'>
                <Link to="/chat">
                  <img src='https://res.cloudinary.com/dksgsqhdk/image/upload/v1746718279/chatbot_rrksgz.png' alt='Chatbot' className='chatbot_image' />
                </Link>
              </div>
          
            
        </div>
        
    </div>
  )
}

export default LandingPage