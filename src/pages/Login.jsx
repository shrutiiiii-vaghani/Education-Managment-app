import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container ,Paper} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const BackgroundContainer = styled(Box)({
  backgroundColor:'#e0e9f3',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledPaper = styled(Paper)({
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#b9d8fa',
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(username, password);
    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'student':
          navigate('/student');
          break;
        default:
          setError('Invalid user role');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <BackgroundContainer>
      <Container component="main" maxWidth="xs">
        <StyledPaper elevation={6}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#000000', 
                },
                '&:hover fieldset': {
                  borderColor: 'primary.dark', 
                },
              },
            }}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" align="center">
                Don't have an account? Register
              </Typography>
            </Link>
          </Box>
        </StyledPaper>
      </Container>
    </BackgroundContainer>
  );
};

export default Login;