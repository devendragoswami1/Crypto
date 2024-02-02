import React from 'react'

function Error({message}) {
  return (
    <div className='bg-red-500 w-fit py-2 rounded-2xl px-4 text-white font-bold fixed bottom-4 left-10'  >! {message}
    
    </div>
  )
}

export default Error