import React, {useState, useContext} from 'react'
import SignupPic from '../assets/womencart.png'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../apis/axiosInstance'
import { AuthContext } from '../store/AuthContextProvider';

const Signup = () => {
  const [error, setError] = useState('');
  const {setUser, setIsAuthenticated} = useContext(AuthContext);

  const navigate = useNavigate();
  async function handleSubmission(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const name = fd.get('name');
    const email = fd.get('email');
    const password = fd.get('password');

    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }
    if (password.length < 6) {
      setError("Password length should at least be 6.");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/register",
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

     setIsAuthenticated(true);
     setUser(response.data);
      setError('');
      e.target.reset();
      navigate("/");

    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong!");
    }

  

  }
  return (
    <div className='w-full h-screen flex flex-col md:flex-row lg:flex-row items-center justify-center gap-8 '>
      <div className='w-1/2 h-full hidden md:block lg:block'>
        <img className='w-full h-full object-cover' src={SignupPic} alt="" />
      </div>
      <div className='w-full md:w-1/2 h-full flex flex-col items-center justify-center gap-9'>
        <h1 className=' text-blue-600 font-bold text-3xl text-shadow-2xs text-center'>Create an account</h1>

        <form onSubmit={handleSubmission}>
          <input type="text" id="name" name="name" placeholder='Username' className='border-2 rounded-2xl  border-gray-300 mb-4 p-2 w-80' />

          <br />
          <input type="email" id="email" name="email" placeholder='Email' className='border-2 rounded-2xl  border-gray-300 mb-4 p-2 w-80' />
          <br />
          <input type="password" id="password" name="password" placeholder='Password' className='border-2 rounded-2xl border-gray-300 mb-4 p-2 w-80' />
          <br />
          <button className='bg-orange-500 text-white py-2 px-4 rounded-2xl w-80 hover:bg-orange-600 focus:outline-2 focus:outline-offset-2 focus:outline-orange-500 active:bg-orange-700 cursor-pointer'>Signup</button>
        </form>
        <span className='text-sm text-shadow-xs text-red-500'>{error}</span>

        <p>Already have an account? <Link className='text-blue-600 hover:text-blue-400 ' to='/auth/login'>Login here</Link></p>
      </div>

    </div>
  )
}

export default Signup
