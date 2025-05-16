import React, { useState } from 'react'
import { socket } from '../../constant/socket'
import { toast } from 'react-hot-toast'
import User from './User'
import { IoSend } from "react-icons/io5";
import Chat from './Chat'
import { useDispatch } from 'react-redux'
import { sendMessage } from '../../redux/chatSlice'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";


const ChatContainer = () => {
  const [inputMessage, setInputMessage] = useState("")
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  // send the message
  const handleSendmessage = async () => {
    dispatch(sendMessage({ message: inputMessage, roomId: localStorage.getItem("roomId") }))
    setInputMessage("")
  }


  socket.on("room joined", (data) => {
    toast.success(`${data} is joined`)
  })

  return (
    <>
      <div className="flex items-center justify-center h-[calc(100vh-70px)]">

        <div className="border bg-orange-100 rounded-xl ">
          <div className="bg-teal-700 rounded-tl-xl rounded-tr-xl p-4 flex items-center gap-1 ">
            <FaRegUserCircle size={30} />
            <h1 className='text-2xl font-bold px-3'>{user.fullName.toUpperCase()}</h1>
          </div>
          <div className="border rounded-md w-[600px] h-[650px] flex justify-between ">

            {/* chat section */}
            <section className="flex flex-col gap-2 h-full justify-between w-full ">

              <div className="overflow-y-scroll  p-3">
                <Chat />
              </div>

              {/* send the message */}
              <div className=" bg-gray-50 w-full flex justify-between items-center border rounded">
                <input type="text" placeholder='Enter your message' className='w-full outline-none border-none p-2' value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
                <button onClick={handleSendmessage}><IoSend size={20} /></button>
              </div>
            </section>

            {/* user section */}
            <section className=''>
              <User />
            </section>

          </div>
        </div>

      </div>
    </>
  )
}

export default ChatContainer
