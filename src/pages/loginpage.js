import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { IoHomeOutline } from "react-icons/io5";
import '../styles/auth.css'
import { Link,useNavigate } from 'react-router-dom';
import AuthsService from '../services/authservice'

const LoginPage = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    usernameOrEmail: null,
    password: null,
    isEmail:false
  });
  

  const [error, setError] = useState('');
  const retreiveFirstInput=(event)=>{
    const inputValue = event.target.value;
    setInputData({ ...inputData, usernameOrEmail: inputValue });
    setError('')
    console.log(inputValue)

  }
  const retreiveSecondInput=(event)=>{
    const inputValue = event.target.value;
    setInputData({ ...inputData, password: inputValue });
    console.log(inputValue)
    setError('')
  }
 
  const sendThedata=async ()=>{
    const inputValue =inputData.usernameOrEmail;
   
    if (inputValue !== null && inputValue !== '') {
      const nameOrEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
      if (nameOrEmailRegex.test(inputValue)) {
        setInputData({ ...inputData, isEmail: true });
        console.log("email");
      } else {
        setInputData({ ...inputData, isEmail: false });
        console.log("name");
      }
      if(inputData.password !==null && inputData.password !== ''){
       //send json to other function
       const result = await AuthsService.LoginRequest(inputData)
       if(result){
        //redirect to explore
        setError('authentification valid')
       
        navigate('/home');
       }
       else{
        setError('inputs invalid')
       }
       
            }
      else{
        setError('password input is empty')
      }
    } else {
      console.log("empty or null");
      setError('identifier input is empty , try again')
    }
  }
  
  return (
    <div className='wrapper'>
      <div className='wrapper-body'>
        <div className='infotext'>
          <h1>Login</h1>
          <h4>More Than <span className='gradient-text'>1000 recipes </span>Around the World</h4>
        </div>
        <div className='form'>
        <Link to="/home">
            <div className='customicon' style={{ color: '#D63031' }}><IoHomeOutline /></div>
          </Link>        <div className='input-container'>
            <div className='icon1' style={{ color: '#D63031' }}><AiOutlineUser /></div>
            <input type='text' placeholder='name Or Email' onChange={retreiveFirstInput}/>
          </div>
          <div className='input-container'>
            <div className='icon1' style={{ color: '#D63031' }}><AiOutlineLock /></div>
            <input type='password' placeholder='Password' onChange={retreiveSecondInput} />
          </div>
          <p>Don't have an account? <Link to="/register">Sign up here</Link></p>    
                <button type='submit' onClick={sendThedata}>Login</button>
          <div className='lineothers'>
          <p>or sign with</p>
          </div>
          <div className='othermethods'>
           
            <div className='icon' style={{ color: '#1877f2' }}><FaFacebook /></div>
            <div className='icon' style={{ color: '#db3236' }}><FaGoogle /></div>
            <div className='icon' style={{ color: '#1da1f2' }}><FaTwitter /></div>
          </div>
          <div className='errors'>
            <p id='errorshow'>{error}</p>
         </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
