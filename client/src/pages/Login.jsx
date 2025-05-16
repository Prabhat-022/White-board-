import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const users= useSelector((state) => state.auth.user)

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginUser(user))
  }

  useEffect(() => {
    if (users) {
      navigate("/home")
    }

  }, [users, navigate])


  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <form onSubmit={handleLogin} className='flex flex-col gap-2 p-2 border border-gray-300 rounded'>
          <h1 className='text-2xl font-bold text-center'>Login</h1>

          <label htmlFor="" className='text-xl font-bold'>Email</label>
          <input type="email" name="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className='outline-none border p-2' />

          <label htmlFor="" className='text-xl font-bold'>Password</label>
          <input type="password" name="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className='outline-none border p-2' />

          <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Login</button>
        </form>

      </div>
    </>
  )

}

export default Login
