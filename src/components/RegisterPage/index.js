import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const RegisterPage = () => {
  const [values,setValues] = useState({
          username:'',
          email:'',
          password:'',
          role:'user'
      })

      const navigate = useNavigate()
  
      const registerHandler = async(event) => {
          event.preventDefault()
          try {
            const registerRes = await axios.post('https://customer-support-chat-app-backend.onrender.com/auth/register',values)
            const response = await registerRes.data;
            console.log("response:",response.success)
            if(response.success){
                toast.success(response.message)
                navigate("/login")
            }else{
                toast.error(response.message)
        }
          } catch (error) {
            console.log(({Error:error.message}))
          }
          
      }
    return (
      <div className='login_inside_container'>
          <form className='form_container' onSubmit={registerHandler}>
          <h3 className='sing_in_title'>REGISTER</h3>
              <div  className='user_input_container'>
                  <label>Username :</label>
                  <input type='text' placeholder='Enter User Name...' className='form_input' onChange={(e) => setValues({...values,username:e.target.value})} required/>
              </div>
              <div  className='user_input_container'>
                  <label>Email :</label>
                  <input type='email' placeholder='Enter Email Address...' className='form_input' onChange={(e) => setValues({...values,email:e.target.value})} required/>
              </div>
              <div  className='user_input_container'>
                  <label>Password :</label>
                  <input type='text' placeholder='Enter Password...' className='form_input' onChange={(e) => setValues({...values,password:e.target.value})} required/>
              </div>
              <div  className='user_input_container'>
                  <label>Role :</label>
                  <select className='select_role_input' onChange={(e) => setValues({...values,role:e.target.value})}>
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                  </select>
              </div>
              <br/>
              <div className='button_container'>
                  <button type='submit' className='login_button'>SIGNUP</button>
                  <p className='not_registered_yet'>Already registered? <Link to="/login"> <span className='click_here'>Click here...</span></Link> To Login</p>
              </div>
              
          </form>
      </div>
    )
}

export default RegisterPage