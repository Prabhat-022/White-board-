import React, { useState } from 'react'
import { socket } from '../constant/socket'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import { axiosInstance } from '../constant/axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
    const { user } = useSelector((state) => state.auth)
    const [roomId, setRoomId] = useState('')
    const [username, setUsername] = useState(user.username || '')
    const token = useSelector((state) => state.auth.token)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleJoin = async (e) => {

        e.preventDefault()

        const response = await axiosInstance.post("/groupchat/joinroom", { roomId, username, userId: user._id }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            withCredentials: true,
        })

        console.log('join room', response)

        if (response.status === 200) {

            localStorage.setItem("roomId", roomId)
            socket.emit("join room", { roomId, username });

            navigate("/index");
        }
    }





    return (
        <div className="flex h-screen justify-center items-center">
            <div className="bg-white p-8 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Join a Room</h1>

                <div className="flex flex-col gap-4">
                    <label className="text-lg font-bold" htmlFor="">Room Id</label>
                    <input type="text" className="p-2 border rounded-md" value={roomId} onChange={(e) => setRoomId(e.target.value)} />

                    <label className="text-lg font-bold" htmlFor="">Username</label>
                    <input type="text" className="p-2 border rounded-md" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <button className="bg-blue-500 text-white p-2 rounded-md" onClick={handleJoin}>Join</button>
                </div>
            </div>

        </div>
    )
}

export default Home
