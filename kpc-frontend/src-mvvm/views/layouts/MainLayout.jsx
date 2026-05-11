/**
 * MainLayout.jsx - Layout principal da aplicação MVVM
 * UI pura para páginas autenticadas com header, navegação e conteúdo
 */
import React from 'react';
import { 
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Paper,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Logout as LogoutIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';

const MainLayout = ({ 
  children,
  user,
  currentTopic,
  currentStep,
  onLogout,
  onNavigateHome,
  title,
  breadcrumbs = [],
  actions,
  maxWidth = 'lg',
  ...props 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Breadcrumbs padrão baseado no estado atual
  const defaultBreadcrumbs = [
    { label: 'Home', href: '/', icon: <HomeIcon fontSize="small" /> },
    ...(currentTopic ? [{ label: `Tópico: ${currentTopic}` }] : []),
    ...(currentStep ? [{ label: currentStep }] : [])
  ];

  const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  // Handler para breadcrumb click
  const handleBreadcrumbClick = (breadcrumb) => {
    if (breadcrumb.href === '/' && onNavigateHome) {
      onNavigateHome();
    } else if (breadcrumb.onClick) {
      breadcrumb.onClick();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.50' }} {...props}>
      {/* App Bar */}
      <AppBar position="static" elevation={2}>
        <Toolbar>
          {/* Logo/Title */}
          <Typography 
            variant="h6" 
            component="h1" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 'bold'
            }}
          >
            Keyphrase Curation
          </Typography>

          {/* User Info */}
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {!isMobile && (
                <Typography variant="body2">
                  Olá, {user.username || user.name || 'Usuário'}
                </Typography>
              )}
              
              {/* Actions customizadas */}
              {actions}
              
              {/* Logout Button */}
              <IconButton 
                color="inherit" 
                onClick={onLogout}
                title="Logout"
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Breadcrumbs */}
      {finalBreadcrumbs.length > 1 && (
        <Box sx={{ backgroundColor: 'white', borderBottom: 1, borderColor: 'divider' }}>
          <Container maxWidth={maxWidth}>
            <Box sx={{ padding: 2 }}>
              <Breadcrumbs 
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                {finalBreadcrumbs.map((breadcrumb, index) => {
                  const isLast = index === finalBreadcrumbs.length - 1;
                  
                  if (isLast) {
                    return (
                      <Box 
                        key={index}
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 0.5,
                          color: 'text.primary',
                          fontWeight: 'medium'
                        }}
                      >
                        {breadcrumb.icon}
                        {breadcrumb.label}
                      </Box>
                    );
                  }
                  
                  return (
                    <Link
                      key={index}
                      component="button"
                      variant="body2"
                      onClick={() => handleBreadcrumbClick(breadcrumb)}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {breadcrumb.icon}
                      {breadcrumb.label}
                    </Link>
                  );
                })}
              </Breadcrumbs>
            </Box>
          </Container>
        </Box>
      )}

      {/* Page Title */}
      {title && (
        <Box sx={{ backgroundColor: 'white', borderBottom: 1, borderColor: 'divider' }}>
          <Container maxWidth={maxWidth}>
            <Box sx={{ padding: 3, paddingBottom: 2 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                {title}
              </Typography>
            </Box>
          </Container>
        </Box>
      )}

      {/* Main Content */}
      <Container maxWidth={maxWidth} sx={{ paddingY: 3 }}>
        <Paper 
          elevation={1}
          sx={{ 
            padding: isMobile ? 2 : 3,
            minHeight: 'calc(100vh - 200px)',
            borderRadius: 2
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default MainLayout;