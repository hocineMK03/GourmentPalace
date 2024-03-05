import React from 'react'
import registernowimg from '../../../images/Untitled-1.png'
import '../../../styles/registernow.css'
import { Link } from 'react-router-dom';
const RegisterNow = () => {
  return (
    <div className='container1'>
      <div>
      <h2>What Are You Waiting For ?</h2>
      <Link to="/register">
      <button>Register Now !</button>
          </Link>
      
      </div>
      <img src={registernowimg}/>
    </div>
  )
}

export default RegisterNow
