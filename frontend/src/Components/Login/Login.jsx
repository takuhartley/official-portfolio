import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../Redux/Actions/userActions.js'
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography
} from '@mui/material'
import './Login.scss'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error: loginError, userInfo } = userLogin

  const handleSubmit = async e => {
    e.preventDefault()

    // validate form fields
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    // call the login action and wait for the response
    await dispatch(login(email, password))

    // check if the login was successful
    if (userInfo && userInfo.token) {
      // redirect to the dashboard page
      navigate('/dashboard')
    } else {
      // display the login error
      setError(loginError || 'Login failed')
    }
  }

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <Typography variant='h3' className='login-title'>
          Sign in
        </Typography>
        {error && <div className='login-error'>{error}</div>}
        {loginError && <div className='login-error'>{loginError}</div>}
        <TextField
          id='email'
          label='Email Address'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='login-field'
        />
        <TextField
          id='password'
          label='Password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          className='login-field'
        />
        <div className='login-field'>
          <Checkbox
            id='rememberMe'
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
          />
          <label htmlFor='rememberMe' className='login-checkbox-label'>
            Remember me
          </label>
        </div>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={loading}
          className='login-button'
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
        <div className='login-links'>
          <a href='#' className='login-forgot-password'>
            Forgot password?
          </a>
          <a href='#' className='login-sign-up'>
            Don't have an account? Sign Up
          </a>
        </div>
      </form>
    </div>
  )
}

export default Login
