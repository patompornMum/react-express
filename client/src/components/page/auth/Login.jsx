import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { Alert, Collapse } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom'

//React Toastify
import { toast } from 'react-toastify';

//Service
import { login, register } from '../../../services/auth';

//Redux
import { useDispatch } from "react-redux";
import { login as loginRedux } from "../../../store/userSlice";

import { useState } from 'react';

const alertBox = (severity = 'success', msg) => {
  return (
    <Alert severity={severity}>
      {msg}
    </Alert>
  );
}

//URL PUBLIC SERVER
const vite_mode = import.meta.env.VITE_MODE ?? null;
console.log(vite_mode)

export default function SignInSide() {

  // const dispatch = useDispatch();

  const [alertLogin, setAlertLogin] = useState(false);

  const navi = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const payload = {
      username: data.get('username'),
      password: data.get('password')
    }
    // console.log(payload);

    //check Input Username Password
    if (!payload.username || !payload.password) {
      setAlertLogin(alertBox('error', 'Please enter your username, password.'))
      return false;
    }

    login(payload)
      .then((res) => {
        console.log(res)
        setAlertLogin(alertBox('success', res.data.msg));
        toast.success(res.data.msg)

        // dispatch(
        //   loginRedux({
        //     name: res.data.userInfo.username,
        //     role: res.data.userInfo.role,
        //     token: res.data.token,
        //     expToken: res.data.userInfo.expToken
        //   })
        // );
        localStorage.setItem("token", res.data.token);
        navi('/feed');
      })
      .catch((err) => {
        console.log(err)
        const errMsg = err.response?.data.msg ?? 'login fails.';
        setAlertLogin(alertBox('error', errMsg))
      })

  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
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
          {vite_mode}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            {/* <Collapse in={alertOpen}>
                <Alert severity="error">
                  {alertMsg}
                </Alert>
              </Collapse> */}
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
              Sign In
            </Button>
            <hr />
            <Button
              component={Link}
              to="/register"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 3 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}