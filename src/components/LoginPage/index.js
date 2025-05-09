import React, { useState } from 'react'
import "./index.css"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Cookies from "js-cookie"
import axios from 'axios'
const LoginPage = () => {

    const [values,setValues] = useState({
        email:'',
        password:'',
    })
    const [showPassword,setShowPassword] = useState(false)
    const navigate = useNavigate()

    const loginHandler = async(event)=> {
        event.preventDefault()
        console.log("Values:",values)
        try {
            const registerRes = await axios.post('https://customer-support-chat-app-backend.onrender.com/auth/signin',values)
            const response = await registerRes.data;
            if(response.success){
                Cookies.set('jwtToken', response.jwtToken, {expires: 30})
                toast.success(response.message)
                navigate("/")
            }else{
                toast.error(response.message)
        }
          } catch (error) {
            console.log(({Error:error.message}))
          }
          
      }

    const passwordClass = showPassword ? 'text':"password"
    // console.log("showPassword:",showPassword)
  return (
    <div className='login_inside_container'>
        <form className='form_container' onSubmit={loginHandler}>
        <h3 className='sing_in_title'>SIGN IN</h3>
            <div  className='user_input_container'>
                <label>Email :</label>
                <input type='email' placeholder='Enter Email Address...' className='form_input' onChange={(e) => setValues({...values,email:e.target.value})} required/>
            </div>
            <div  className='user_input_container'>
                <label>Password :</label>
                <input type={`${passwordClass}`} placeholder='Enter Password...' className='form_input' onChange={(e) => setValues({...values,password:e.target.value})} required/>
            </div>
            <div className='show_password_container'>
                <input type='checkbox' id='checkbox' className='checkbox' onChange={() => setShowPassword(!showPassword)}/>
                <label htmlFor='checkbox'>Show Password</label>
            </div>
            <br/>
            <div className='button_container'>
                <button type='submit' className='login_button'>LOGIN </button>
                <p className='not_registered_yet'>Not registered yet? <Link to="/register"><span className='click_here'>Click here...</span></Link></p>
            </div>
            
        </form>
    </div>
  )
}

export default LoginPage