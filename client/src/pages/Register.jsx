import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    fullName: "",
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    console.log('user', user)
    dispatch(registerUser(user))
    navigate("/home")

  }
  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <form onSubmit={handleRegister} className='flex flex-col gap-2 p-2 border border-gray-300 rounded'>
          <h1 className='text-2xl font-bold text-center'>Register</h1>

          {/* full name section */}
          <label htmlFor="" className='text-xl font-bold'>Full Name </label>
          <input type="text" name="fullName" id="fullName" value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })} className='outline-none border p-2' />

          {/* username section */}
          <label htmlFor="" className='text-xl font-bold'>Username</label>
          <input type="text" name="username" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className='outline-none border p-2' />

          {/* email section */}
          <label htmlFor="" className='text-xl font-bold'>Email</label>
          <input type="email" name="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className='outline-none border p-2' />

          {/* password section */}
          <label htmlFor="" className='text-xl font-bold'>Password</label>
          <input type="password" name="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className='outline-none border p-2' />

          <button type="submit" className='bg-blue-500 text-white p-2 rounded'> Register</button>
        </form>

      </div>
    </>
  )
}

export default Register
