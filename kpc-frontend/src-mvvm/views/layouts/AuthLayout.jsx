/**
 * AuthLayout.jsx - Layout para páginas de autenticação MVVM
 * UI pura para telas de login e recuperação de senha
 */
import React from 'react';
import { 
  Container, 
  Paper, 
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';

const AuthLayout = ({ 
  children, 
  title = "Keyphrase Curation", 
  subtitle,
  maxWidth = 'sm',
  ...props 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        padding: 2
      }}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Paper
          elevation={6}
          sx={{
            padding: isMobile ? 3 : 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          {/* Header */}
          <Box 
            sx={{ 
              textAlign: 'center', 
              marginBottom: 3,
              width: '100%' 
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main'
              }}
            >
              {title}
            </Typography>
            
            {subtitle && (
              <Typography 
                variant="body1" 
                color="textSecondary"
                sx={{ marginBottom: 2 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          {/* Content */}
          <Box 
            sx={{ 
              width: '100%',
              maxWidth: 400 
            }}
          >
            {children}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;