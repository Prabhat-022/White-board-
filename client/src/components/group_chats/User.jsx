import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { socket } from '../../constant/socket'
import { useSelector } from 'react-redux'
const User = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { user } = useSelector((state) => state.auth)

  console.log("onlineUsers", onlineUsers)

  useEffect(() => {
    socket.on("getOnlineUsers", (userIds) => {
      console.log("userIds", userIds)
      setOnlineUsers(userIds);
    });
  }, []);


  return (
    <div className=' h-full w-full overflow-y-scroll w-[200px] p-2 flex flex-col gap-4 border border-gray-300 rounded'>
      {onlineUsers.map((user) => (
        <div className='flex gap-2 items-center relative'>
          <FaRegUserCircle size={20} />
          <div className='w-2 h-2 bg-green-500 rounded-full absolute top-0 right-0' style={{ backgroundColor: user === user._id ? "green" : "" }}></div>
        </div>
      ))}

    </div>
  )
}

export default User
