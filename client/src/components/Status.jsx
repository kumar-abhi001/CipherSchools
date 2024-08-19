import React from 'react'

export default function ({
    text,
    color
}) {
  return (
      <div className='flex flex-row align-middle'>
        <div className={`border-2 border-white rounded-[50%] bg-[${color}] w-4 h-4 mt-1`}></div>
        <div>{text}</div>
    </div>
  )
}
