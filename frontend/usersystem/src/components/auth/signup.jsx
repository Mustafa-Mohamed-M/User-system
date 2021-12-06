import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../copyright';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";



const theme = createTheme();

export default function SignUp() {

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const body = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      phone_number: data.get('phonenumber'),
    };
    setLoading(true);
    setMessage('Just a moment...');
    setErrorMessage(null);
    try {
      const response = await axios.post(`http://localhost:5000/auth/signup`, body);
      setMessage('Registration successful. Redirecting...');
      navigate('/login');
    } catch (error) {
      console.log({error});
      let mess = 'Something went wrong. That\'s all we know.'
      if (error.response){
        mess = error.response.data;
        if (error.response.status === 500) mess = "Please try a different username-email combination."
      }
      setLoading(false);
      setErrorMessage(`${mess}`);
      setMessage('');
    }
  };


  document.title = 'User System | Signup';

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="phonenumber"
                  required
                  fullWidth
                  id="phonenumber"
                  label="Phone number"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            {errorMessage && 
              <Alert severity="error" >
                {errorMessage}
              </Alert>
            }
            {message && 
              <Alert severity="info">
                {message}
              </Alert>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}