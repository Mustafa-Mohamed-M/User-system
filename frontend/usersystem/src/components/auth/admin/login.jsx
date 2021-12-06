import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
import { Alert } from "@mui/material";
import Copyright from '../../copyright';
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignIn() {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setErrorMessage(null);
    setMessage('Validating...');
    setLoading(true);
    //make request to sign in
    try{
      let result = await axios.post(`http://localhost:5000/auth/admin/login`, {
        email: data.get('email'),
        password: data.get('password')
    });
    if (result.status === 200){ //login succeeded
        //get token from body
        const {token} = result.data;
        setMessage('Success. Redirecting...');
        setLoggedIn(true);
        localStorage.setItem('admin-token', token);
        localStorage.setItem('admin-email', data.get('email'));
    }
    else if (result.status === 404){
      setMessage(null);
      setErrorMessage('Unable to login. Try again later.');
    }
    else{
        setMessage(null);
        setErrorMessage('Unable to login. Try again later.');
    }
    } catch (err){
      setMessage(null);
        //console.log(err);
        setErrorMessage(`Failed: ${err.response.data}`);
    }
    setLoading(false);
  };

  //check if user has logged in
  React.useEffect(()=>{
    //if logged in, redirect to home page
    if (loggedIn){
      navigate('/admin');
    }
  }, );

  document.title = 'User System | Admin Login';
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Admin email address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Admin password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Sign In
            </Button>
            {message !== null ? <Alert severity="info">{message}</Alert> : ""}
            {errorMessage !== null ? <Alert severity="error">{errorMessage}</Alert> : ""}
            <Grid container>
              <Grid item xs>
                {/* <Link to="" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
