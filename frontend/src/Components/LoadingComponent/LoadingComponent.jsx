import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Loading = props => {
  return (
    <div>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress />
      </Box>
      );
    </div>
  )
}

export default Loading
