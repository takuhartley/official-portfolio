import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }, [navigate])
  return <div>Error 404 Page Not Found</div>
}

export default NotFound
