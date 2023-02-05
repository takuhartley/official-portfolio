import React, { useState } from 'react'
import { Container, TextField, Button, Typography } from '@mui/material'
import './ContactPage.scss'
const ContactPage = () => {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    // Send email here
    window.location.href = `mailto:robert.taku.hartley@gmail.com?subject=${subject}&body=${description}`
  }

  return (
    <>
      <div className='contact-page'>
        <Container>
          <Typography variant='h4'>Reach Out</Typography>
          <Typography>
            I'm always happy to hear from you! Please fill out the form below to
            send me an email.
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <TextField
                id='contact-email'
                label='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <TextField
                id='contact-subject'
                label='Subject'
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <TextField
                id='contact-description'
                label='Description'
                value={description}
                onChange={e => setDescription(e.target.value)}
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className='submit-btn'
              >
                Send
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </>
  )
}
export default ContactPage
