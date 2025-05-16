import React from 'react'
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import { useSyncDemo } from '@tldraw/sync'

const Board = () => {

  const roomId = localStorage.getItem("roomId")
	const store = useSyncDemo({ roomId })
    console.log("sync", store)
  return (
    <div style={{ position: 'relative', inset: 0, width: '100%', height: '80vh' }} className='w-full h-full'>
      <Tldraw store={store} />
    </div>
  )
}

export default Board
