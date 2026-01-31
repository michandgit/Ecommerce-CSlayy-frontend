import React, {useState, useContext} from 'react'
import LoginPic from '../assets/womencart.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import axiosInstance from '../apis/axiosInstance';
import { AuthContext } from '../store/AuthContextProvider';


const Login = () => {

  const [error , setError] = useState('');
  const {setUser, setIsAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();


  async function handleSubmission(e) {
    e.preventDefault();
    console.log("Submitted!");
    const fd = new FormData(e.target);
   
    const email = fd.get('email');
    const password = fd.get('password');

    console.log("Email: "+email+" password: "+password);
    if(!email || !password){
      setError('All fields should have a value.')
      return;
    }
    if(password.length < 6){
      setError('Password length should atleast be 6.')
      return;
    }
    
    try {
    const response = await axiosInstance.post(
      '/auth/login',
      { email, password },                 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("Response: ", response);
   
    setIsAuthenticated(true);
    setUser(response.data);
    setError('');
    e.target.reset();
    navigate("/");

  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Something went wrong");
  }
   
  }
  return (
    <div className='w-full h-screen flex flex-col md:flex-row lg:flex-row items-center justify-center gap-8 '>
      <div className='w-1/2 h-full hidden md:block lg:block'>
        <img className='w-full h-full object-cover' src={LoginPic} alt="" />
      </div>
      <div className=' w-full md:w-1/2 h-full flex flex-col items-center justify-center gap-9'>
        <h1 className='text-shadow-blue-800 text-blue-400 font-bold text-3xl w-full text-center'>Welcome Back! 😊</h1>
        <form onSubmit={handleSubmission}>
          <input id="email" name='email' type="email" placeholder='Email' className='border-2  rounded-2xl focus:border-gray-700 focus:text-gray-800 border-gray-300 mb-4 p-2 w-80' />
          <br />
          <input id="password" name="password"  type="password" placeholder='Password' className='border-2 rounded-2xl focus:border-gray-700 border-gray-300 mb-4 p-2 w-80' />
          <br />
          <button className='cursor-pointer bg-orange-500 text-white py-2 px-4 rounded-2xl w-80 hover:bg-orange-600 focus:outline-2 focus:outline-offset-2 focus:outline-orange-500 active:bg-orange-700'>Login</button>
        </form>
         <span className='text-sm text-shadow-xs text-red-500'>{error}</span>
        <p>Do not have an account? <Link className='text-blue-600 hover:text-blue-400' to='/auth/signup'>Signup</Link></p>

      </div>

    </div>
  )
}

export default Login
