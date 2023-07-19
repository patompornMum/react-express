import { Button } from '@mui/material'
import React from 'react'

import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <>
      Register
      <Button
          component={Link}
          to="/login"
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 3 }}
        >Login</Button>
    </>
  )
}

export default Register