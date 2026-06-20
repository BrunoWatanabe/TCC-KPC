// @model: specs/001-login-component/model/login-classes.puml
// RF: RF-001, RF-002, RF-003, RF-004, RF-008, RF-010

/**
 * LoginView.jsx - View pura para login MVVM
 * UI pura sem lógica de negócio, recebe tudo via props do ViewModel
 */
import React from 'react';
import { 
  Box,
  Alert,
  Typography
} from '@mui/material';
import { AuthLayout } from '../layouts/index.js';
import { Button, TextField } from '../components/index.js';

const LoginView = ({
  // Estado do formulário
  username,
  password,
  loading,
  error,
  
  // Handlers
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  
  // Props opcionais
  title = "Sistema de Curação de Keyphrases",
  subtitle = "Faça login para continuar"
}) => {
  return (
    <AuthLayout title={title} subtitle={subtitle}>
      <Box component="form" onSubmit={onSubmit} noValidate>
        {/* Mensagem de erro */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {/* Campo Username */}
        <TextField
          label="Nome de usuário"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          required
          fullWidth
          autoFocus
          disabled={loading}
          error={!!error}
          sx={{ mb: 2 }}
        />
        
        {/* Campo Password */}
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
          fullWidth
          disabled={loading}
          error={!!error}
          sx={{ mb: 3 }}
        />
        
        {/* Botão Submit */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          loading={loading}
          disabled={!username || !password}
          sx={{ py: 1.5 }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
        
        {/* Informações adicionais */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" color="textSecondary">
            Sistema MVVM - Versão 1.0
          </Typography>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default LoginView;