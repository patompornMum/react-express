import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Alert, Collapse } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

//icon
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

import { Link, useNavigate } from 'react-router-dom'

//Service
import { login, register } from '../../../services/auth';

import { useState } from 'react';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const alertBox = (severity = 'success', msg) => {
  return (
    <Alert severity={severity}>
      {msg}
    </Alert>
  );
}

export default function Register() {

  const navi = useNavigate();

  const [alertLogin, setAlertLogin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const payload = {
      username: data.get('username'),
      password: data.get('password')
    }
    console.log(payload);

    register(payload)
      .then((res) => {
        console.log(res)
        setAlertLogin(alertBox('success',res.data.msg))
        setTimeout(()=>navi('/login'),1000);
      })
      .catch((err) => {
        console.log(err)
        const errMsg = err.response?.data.msg ?? 'Register fails.';
        setAlertLogin(alertBox('error',errMsg))
      })

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <EnhancedEncryptionIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box sx={{ mt: 1 }}>
              {
                alertLogin &&
                alertLogin
              }
            </Box>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 3 }}
              >
                Register
              </Button>
              <hr />
              <Button
                component={Link}
                to="/login"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 3 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}