import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Container,
  CircularProgress,
} from '@mui/material';
import PropTypes from 'prop-types';

const LoginStatus = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING', 
  OK: 'OK',
  ERROR: 'ERROR'
};

const Login = ({
  onLogin = () => {},
  onError = () => {},
  authenticationType = 'token', // 'token' or 'cookie'
  title = 'Login',
  disabled = false,
  variant = 'outlined',
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(LoginStatus.INITIAL);
  const [errorMessage, setErrorMessage] = useState('');

  // Simular autenticação - no mundo real seria uma API call
  const mockAuthentication = async (username, password, type) => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular validação simples
    if (username && password && username.length > 2 && password.length > 3) {
      if (type === 'token') {
        return {
          token_type: 'bearer',
          access_token: `mock_token_${username}_${Date.now()}`,
          username: username
        };
      } else if (type === 'cookie') {
        return {
          token_type: 'cookie',
          cookie: `auth_cookie=${username}_session_${Date.now()}; HttpOnly; Secure`,
          username: username
        };
      }
    }
    throw new Error('Credenciais inválidas');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!username || !password) {
      setErrorMessage('Username e password são obrigatórios');
      setLoginStatus(LoginStatus.ERROR);
      return;
    }

    setLoginStatus(LoginStatus.LOADING);
    setErrorMessage('');

    try {
      const authResult = await mockAuthentication(username, password, authenticationType);
      setLoginStatus(LoginStatus.OK);
      
      // Simular armazenamento do token
      if (authResult.token_type === 'bearer') {
        sessionStorage.setItem('access_token', authResult.access_token);
      }
      
      onLogin(authResult);
    } catch (error) {
      setLoginStatus(LoginStatus.ERROR);
      setErrorMessage(error.message || 'Erro na autenticação');
      onError(error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if (loginStatus === LoginStatus.ERROR) {
      setLoginStatus(LoginStatus.INITIAL);
      setErrorMessage('');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (loginStatus === LoginStatus.ERROR) {
      setLoginStatus(LoginStatus.INITIAL);
      setErrorMessage('');
    }
  };

  const isLoading = loginStatus === LoginStatus.LOADING;
  const hasError = loginStatus === LoginStatus.ERROR;
  const isSuccess = loginStatus === LoginStatus.OK;

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
            {title}
          </Typography>

          {hasError && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {isSuccess && (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              Login realizado com sucesso!
            </Alert>
          )}

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              variant={variant}
              value={username}
              onChange={handleUsernameChange}
              disabled={disabled || isLoading}
              error={hasError}
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
              variant={variant}
              value={password}
              onChange={handlePasswordChange}
              disabled={disabled || isLoading}
              error={hasError}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled || isLoading || !username || !password}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? 'Fazendo login...' : 'Login'}
            </Button>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" align="center">
                Tipo de autenticação: {authenticationType === 'token' ? 'Token Bearer' : 'Cookie'}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

Login.propTypes = {
  /** Callback chamado quando o login é bem-sucedido */
  onLogin: PropTypes.func,
  /** Callback chamado quando ocorre erro no login */
  onError: PropTypes.func,
  /** Tipo de autenticação: 'token' ou 'cookie' */
  authenticationType: PropTypes.oneOf(['token', 'cookie']),
  /** Título do formulário de login */
  title: PropTypes.string,
  /** Se o formulário está desabilitado */
  disabled: PropTypes.bool,
  /** Variante dos campos de texto */
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
};

export default Login;
