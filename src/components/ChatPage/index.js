import React, { useEffect, useState } from 'react'
import { FiSend } from "react-icons/fi";
import Header from '../Header'
import Cookies from 'js-cookie';
import axios from 'axios';
import {format} from 'date-fns';

import "./index.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ChatPage = () => {
    const [userProfileInfo,setUserProfileInfo] = useState([])
    const [file,setFile] = useState(null)
    const [chatList,setChatList] = useState([])
    const [inputMessage,setInputMessage] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const jwtToken = Cookies.get('jwtToken')
    //console.log("jwtToken:",jwtToken)

    const changeInMessage = event => {
        setInputMessage(event.target.value);
    }

        useEffect(() => {
        if(jwtToken === undefined){
            navigate("/login")
        }
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
    },[])


    const getResponse = async() => {
        if(jwtToken === undefined){
            navigate("/login")
        }

        const messageResponse = await axios.post('https://customer-support-chat-app-backend.onrender.com/api/message/user_message',{message:inputMessage},{
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
        })

        const messageData = await messageResponse.data.messageQuery;
        setLoading(false)
        setChatList([...chatList,messageData])
    }
    const inputMessageHandler = (event) =>{
        event.preventDefault()
        //console.log("inputMessage:",inputMessage)
        getResponse()
        setLoading(true)
    }

    useEffect(()=>{
        const getSpecificMessages = async() => {
            const response = await axios.get('https://customer-support-chat-app-backend.onrender.com/api/message/response',{
                headers:{
                    Authorization:`Bearer ${jwtToken}`
                }
            })
            const chatData = await response.data.getAllResponses;
            setChatList(chatData);
        }
        getSpecificMessages()
    },[inputMessage])

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    console.log("chatList:",userProfileInfo);
    
    const uploadFileClassName = userProfileInfo.role === 'admin' ? 'admin_container' :"";

  return (
    <div className='chat_dashboard_main_container'>
        <Header/>
        <div className='chat_inside_container'>
        <div className='chat_message_container'>
        {chatList.length > 0 ? 
        <div>
            {chatList.map(chat => {
                return(
                    <div key={chat._id} className='chat_box_list_container'>
                    <div className='input_message'>
                        <p className='input_message_para'>{chat.message}</p>
                        <p className='response_time'>{format(chat.createdAt,'p')}</p>
                    </div>
                    <div className='message_response'>
                        <p className='message_response_para'>{chat.response}</p>
                        <p className='response_time input_response'>{format(chat.createdAt,'p')}</p>
                    </div>
                    
                    </div>
                )
            })}
            {loading ? <p className='loading_tittle'>loading...</p>:null}
        </div>
        
        :
        <h3 className='no_chats_title'>No Chats</h3>}
        
        <form onSubmit={inputMessageHandler} className='chat_input_container'>
            <input type='text' placeholder='Enter text here..' className={`message_input ${uploadFileClassName}`} onChange={changeInMessage} required/>
            
            <div className='file_input_msg_send_container'>
                {userProfileInfo.role === "admin"?<input type='file' placeholder='file' className='upload_file' onChange={handleFileChange}/> : null}
                <button type='submit' className='send_button'>Send<FiSend className='send_icon'/></button>
            </div>
        </form>
    </div>
    </div>
    </div>
  )
}

export default ChatPage