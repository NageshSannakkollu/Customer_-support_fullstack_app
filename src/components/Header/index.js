import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import "./index.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const Header = () => {
    const [userProfileInfo,setUserProfileInfo] = useState([])
    const navigate = useNavigate()
    const jwtToken = Cookies.get('jwtToken')
    console.log("userInfoRequest:",jwtToken)
    useEffect(() => {
        if(jwtToken === undefined){
            navigate("/")
        }
        if(jwtToken !== undefined){
            const getUserInfo = async() => {
            const userInfoRequest = await axios.get('https://customer-support-chat-app-backend.onrender.com/auth/profile',{
                headers:{
                    Authorization:`Bearer ${jwtToken}`
                }
            })
            
            if(userInfoRequest.data.success === false){
                toast.error(userInfoRequest.data.message)
            }
            const userData = await userInfoRequest.data.userResponse;
            setUserProfileInfo(userData)
        }
        getUserInfo()
        }
        
        
    },[])

    const clickOnLogout = () => {
        Cookies.remove('jwtToken')
        navigate("/login")
    }

  return (
    <nav className='nav_header_main_container'>
        <img src='https://res.cloudinary.com/dksgsqhdk/image/upload/v1746681440/spotmies_banner_twt0tg.png' alt='Logo' className='logo_image' />
        {jwtToken === undefined ?
        <ul className='nav_list_container'>
            <Link to="/login" className='link_item'> 
                <li className='login'>Login</li>
            </Link>
            <Link to="/register" className='link_item'>
                <li className='register'>Register</li>
            </Link>
        </ul>
        :
        <ul className='nav_list_container'>
        {userProfileInfo.role === "admin" ? 
            <li className='user_name'>{userProfileInfo.username}(A)
            </li>
            : 
            <li className='user_name'>{userProfileInfo.username}
            </li>}
            <li className='register' onClick={clickOnLogout}>Logout</li>
        </ul>
    
        
        }
    </nav>
  )
}

export default Header