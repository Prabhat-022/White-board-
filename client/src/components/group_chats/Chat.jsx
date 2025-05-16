import React, { useEffect } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { receiveMessage } from '../../redux/chatSlice'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { socket } from '../../constant/socket'

const Chat = () => {

    const [chat, setChat] = useState([])
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { messages } = useSelector((state) => state.chat)

    useEffect(() => {
        dispatch(receiveMessage(localStorage.getItem("roomId")))
    }, [dispatch])
    useEffect(() => {
        setChat(messages)
    }, [messages])

    // useEffect(() => {
    //     setChat((prevChat) => [...prevChat, ...messages])
    // }, [messages])

    useEffect(() => {
        socket.on("new message", (data) => {
            console.log("comming sms:", data)
            setChat((prevChat) => [...prevChat, data])
        })
    }, [socket])

    return (
        <div>
            {chat.map((message) => (
                <>
                    {message.userId !== user._id ? (
                        <div className="h-[6vh] flex flex-col justify-start items-start">
                            <div className='flex gap-2 bg-white items-center p-2 rounded'>
                                <FaRegUserCircle size={20} />
                                <h1 className='text-black'>{message.message}</h1>
                            </div>
                        </div>
                    ) : (
                        <div className="h-[6vh] flex flex-col justify-end items-end">
                            <div className='flex gap-2 bg-green-500 items-center p-2 rounded'>
                                <FaRegUserCircle size={20} />
                                <h1 className='text-white'>{message.message}</h1>
                            </div>
                        </div>
                    )}
                </>
            ))}


        </div>
    )
}

export default Chat
