import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout());
        navigate("/")
    }
    return (
        <header className='flex justify-between items-center p-2 border-b mb-2 bg-amber-50'>
            <nav className='flex justify-between items-center w-full'>
                <div>
                    <h1 className='text-2xl font-bold'>WhiteBoard</h1>
                </div>

                <div className='flex gap-4 items-center '>
                    <div className="flex flex-col  items-center">
                        <FaRegUserCircle size={20} />
                        <h1 className='text-black'>{user.fullName}</h1>
                    </div>
                    <button className='bg-red-500 text-white p-2 rounded' onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </header>
    )
}

export default Header
