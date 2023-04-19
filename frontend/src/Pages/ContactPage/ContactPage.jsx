import React, { useState } from 'react'
import { Container, TextField, Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import ScrollTrigger from 'react-scroll-trigger'
import './ContactPage.scss'

const ContactPage = () => {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    window.location.href = `mailto:robert.taku.hartley@gmail.com?subject=${subject}&body=${description}`
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <>
      <div className='contact-page'>
        <Container>
          <ScrollTrigger
            
          >
            <motion.div
              initial='hidden'
              animate='visible'
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <Typography variant='h4' gutterBottom>
                Reach Out
              </Typography>
            </motion.div>
          </ScrollTrigger>
          <Typography paragraph>
            I'm always happy to hear from you! Please fill out the form below to
            send me an email.
          </Typography>
          <form onSubmit={handleSubmit}>
            <ScrollTrigger>
              <motion.div
                initial='hidden'
                animate='visible'
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <div className='form-group'>
                  <TextField
                    id='contact-email'
                    label='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='form-control'
                    fullWidth
                    margin='normal'
                  />
                </div>
              </motion.div>
            </ScrollTrigger>
            <ScrollTrigger>
              <motion.div
                initial='hidden'
                animate='visible'
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <div className='form-group'>
                  <TextField
                    id='contact-subject'
                    label='Subject'
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className='form-control'
                    fullWidth
                    margin='normal'
                  />
                </div>
              </motion.div>
            </ScrollTrigger>
            <ScrollTrigger>
              <motion.div
                initial='hidden'
                animate='visible'
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <div className='form-group'>
                  <TextField
                    id='contact-description'
                    label='Description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className='form-control'
                    fullWidth
                    margin='normal'
                    multiline
                    rows={4}
                  />
                </div>
              </motion.div>
            </ScrollTrigger>
            <ScrollTrigger>
              <motion.div
                initial='hidden'
                animate='visible'
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
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
              </motion.div>
            </ScrollTrigger>
          </form>
        </Container>
      </div>
    </>
  )
}

export default ContactPage
