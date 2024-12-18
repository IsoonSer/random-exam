import React from 'react'

interface ButtonProps {
    text: string,
    handler: any
}

const Button = ({text, handler}: ButtonProps) => {
  return (
    <button className='bg-blue-400 p-3' onClick={handler}>{text}</button>
  )
}

export default Button