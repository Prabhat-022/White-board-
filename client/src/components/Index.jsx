import React from 'react'
import ChatContainer from './group_chats/ChatContainer'
import Board from './white_board/Board'

const Index = () => {
    return (
        <>
            <main className='w-full h-full flex'>

                <div className="w-[50%] border">
                    <Board />
                </div>
                <div className="w-[50%]">
                    <ChatContainer />
                </div>

            </main>
        </>
    )
}

export default Index
