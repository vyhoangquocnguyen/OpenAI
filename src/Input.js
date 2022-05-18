import React from 'react'

export default function Input({input}) {
  return (
    <>
        <li>
            Advertising for: {input.input}           
        </li>
        <li>
            Response: {input.resp}
        </li>
    </>
 
  )
}
