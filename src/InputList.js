import React from 'react'
import Input from './Input'

export default function InputList({userInputsList}) {
  return (
    userInputsList.map(input => {
     return <Input key = {input.id} input = {input}  />
    })
  )
}
