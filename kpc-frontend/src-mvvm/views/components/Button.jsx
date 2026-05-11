/**
 * Button.jsx - Componente de botão reutilizável MVVM
 * Baseado no Material-UI Button, mas com props padronizadas para o sistema
 */
import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <MuiButton
      type={type}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      endIcon={endIcon}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;