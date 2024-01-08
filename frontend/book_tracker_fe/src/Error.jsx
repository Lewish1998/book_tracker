import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
      <h1>404 Error</h1>
      <h2>This page doesn't exist</h2>
      <h3><Link to={'/'}>Return Home</Link></h3>
    </div>
  )
}

export default 404