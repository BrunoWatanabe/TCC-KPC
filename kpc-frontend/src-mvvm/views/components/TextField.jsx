/**
 * TextField.jsx - Componente de campo de texto reutilizável MVVM
 * Baseado no Material-UI TextField com props padronizadas
 */
import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

const TextField = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error = false,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  variant = 'outlined',
  size = 'medium',
  multiline = false,
  rows,
  maxRows,
  autoFocus = false,
  autoComplete,
  InputProps,
  ...props
}) => {
  return (
    <MuiTextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      multiline={multiline}
      rows={rows}
      maxRows={maxRows}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      InputProps={InputProps}
      {...props}
    />
  );
};

export default TextField;