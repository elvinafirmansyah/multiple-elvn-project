import React from 'react'

const ErrorMessage = ({children}) => {
  return (
    <h5 className='text-red-500'>{children}</h5>
  )
}

export default ErrorMessage;