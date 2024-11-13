// src/Login.js
import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Fade, InputAdornment, IconButton, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("loggedinUser")){
      navigate("/dashboard")
    }
  }, [])
  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    if (!email || !password) {
      setError('Please fill in both fields');
      setLoading(false);
      return;
    }

    try {
      // Communicate with the Electron backend
      const response = await window.electron.login(email, password);

      if (response.success) {
        localStorage.setItem("loggedinUser", JSON.stringify(response));
        navigate("/dashboard")
        alert('Logged in successfully');
      } else {
        setError(response.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Paper elevation={10} sx={{ padding: 4, width: 400, borderRadius: 2 }}>
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Welcome Back!
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Please login to continue
            </Typography>
          </Box>
        </Fade>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {error && <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>{error}</Typography>}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ marginTop: 2 }}
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Login'}
        </Button>

        <Grid container sx={{ marginTop: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button color="primary" sx={{ padding: 0 }}>Sign Up</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
