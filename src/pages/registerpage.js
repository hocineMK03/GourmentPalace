import React, { useState } from 'react'
import '../styles/auth.css'
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { CiMail } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import authservice from '../services/authservice';
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    name: null,
    username:null,
    email:null,
    password: null,
  });
  

  const [error, setError] = useState('');
  const retreiveFirstInput=(event)=>{
    const inputValue = event.target.value;
    setInputData({ ...inputData, name: inputValue });
    setError('')
    console.log(inputValue)

  }
  const retreiveSecondInput=(event)=>{
    const inputValue = event.target.value;
    setInputData({ ...inputData, username: inputValue });
    console.log(inputValue)
    setError('')
  }
  const retreiveThirdInput=(event)=>{
    const inputValue = event.target.value;
    setInputData({ ...inputData, email: inputValue });
    console.log(inputValue)
    setError('')
  }
  const retreiveForthInput=(event)=>{

    const inputValue = event.target.value;
    setInputData({ ...inputData, password: inputValue });
    console.log(inputValue)
    setError('')
  }
  const sendData=async()=>{
    console.log("here")
    const nameOrEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$|^[a-zA-Z][a-zA-Z0-9._-]{0,19}$/;
  if(inputData.password !==null && inputData.password !== '' && inputData.name !==null && inputData.name !== '' && inputData.email !==null && inputData.email !== '')
    if(nameOrEmailRegex.test(inputData.email)){
console.log("inputData",inputData)
const result=await authservice.RegisterRequest(inputData)
if(result){
  navigate('/explore');
}
else{
  setError('inputs are invalid')
}

    }
  }
  return (
    <div className='wrapper'>
      <div className='wrapper-body'>
        <div className='infotext'>
          <h1>Register</h1>
          <h4>More Than <span className='gradient-text'>1000 recipes </span>Around the World</h4>
        </div>
        <div className='form'>
        <Link to="/home">
            <div className='customicon' style={{ color: '#D63031' }}><IoHomeOutline /></div>
          </Link> 
        <div className='input-container'>
            <div className='icon1' style={{ color: '#D63031' }}><AiOutlineUser /></div>
            <input type='text' placeholder='Name' onChange={retreiveFirstInput} />
          </div>
          <div className='input-container'>
            <div className='icon1' style={{ color: '#D63031' }}><AiOutlineUser /></div>
            <input type='text' placeholder='username *' onChange={retreiveSecondInput}/>
          </div>
          <div className='input-container'>
            <div className='icon1' style={{ color: '#D63031' }}><CiMail /></div>
            <input type='email' placeholder='Email' onChange={retreiveThirdInput} />
          </div>
          <div className='input-container'>
            <div className='icon1' style={{ color: '#D63031' }}><AiOutlineLock /></div>
            <input type='password' placeholder='Password' onChange={retreiveForthInput}/>
          </div>
         
          <button type='submit' onClick={sendData}>Register</button>
          <p>Already have an account? <Link to="/login">Log In here</Link></p>    

         <div className='errors'>
            <p></p>
         </div>
         
        </div>
      </div>
      </div>
  )
}

export default RegisterPage
