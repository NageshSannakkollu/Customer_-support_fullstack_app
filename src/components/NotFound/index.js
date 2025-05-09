import React from 'react'
import Header from '../Header'
import { Link } from 'react-router-dom'


import "./index.css"
const NotFound = () => {
  return (
    <div>
        <Header/>
        <div className="not_found_inside_container">
            <img src='https://res.cloudinary.com/dksgsqhdk/image/upload/v1743151479/not-found-blog-img_eefok5.png' alt='Not Found' className='not_found_image' />
            
            <Link to="/">
                <button type='button' className='home_button' >Go To Dashboard</button>
            </Link>
        </div>
    </div>
  )
}

export default NotFound