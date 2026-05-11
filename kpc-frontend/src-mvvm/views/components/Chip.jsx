/**
 * Chip.jsx - Componente de chip reutilizável MVVM
 * Usado para exibir keyphrases, clusters, status, etc.
 */
import React from 'react';
import { Chip as MuiChip } from '@mui/material';

const Chip = ({
  label,
  onClick,
  onDelete,
  variant = 'filled',
  color = 'default',
  size = 'medium',
  disabled = false,
  icon,
  deleteIcon,
  clickable = false,
  sx,
  ...props
}) => {
  return (
    <MuiChip
      label={label}
      onClick={onClick}
      onDelete={onDelete}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      icon={icon}
      deleteIcon={deleteIcon}
      clickable={clickable || !!onClick}
      sx={{
        margin: 0.5,
        ...sx
      }}
      {...props}
    />
  );
};

export default Chip;