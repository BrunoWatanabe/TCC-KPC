import { fn } from 'storybook/test';
import Login from '../components/Login';

export default {
  title: 'Components/Login',
  component: Login,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onLogin: { action: 'login-success' },
    onError: { action: 'login-error' },
    authenticationType: {
      control: { type: 'select' },
      options: ['token', 'cookie'],
      description: 'Tipo de autenticação'
    },
    title: { 
      control: 'text',
      description: 'Título do formulário'
    },
    disabled: { 
      control: 'boolean',
      description: 'Se o formulário está desabilitado'
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
      description: 'Variante dos campos de texto'
    },
  },
  args: { 
    onLogin: fn(),
    onError: fn(),
  },
};

// Default login form
export const Default = {
  args: {
    authenticationType: 'token',
    title: 'Login',
    disabled: false,
    variant: 'outlined',
  },
};

// Token authentication
export const TokenAuthentication = {
  args: {
    authenticationType: 'token',
    title: 'Login com Token',
    disabled: false,
    variant: 'outlined',
  },
};

// Cookie authentication
export const CookieAuthentication = {
  args: {
    authenticationType: 'cookie',
    title: 'Login com Cookie',
    disabled: false,
    variant: 'outlined',
  },
};

// Disabled state
export const Disabled = {
  args: {
    authenticationType: 'token',
    title: 'Login Desabilitado',
    disabled: true,
    variant: 'outlined',
  },
};

// Filled variant
export const FilledVariant = {
  args: {
    authenticationType: 'token',
    title: 'Login',
    disabled: false,
    variant: 'filled',
  },
};

// Standard variant
export const StandardVariant = {
  args: {
    authenticationType: 'token',
    title: 'Login',
    disabled: false,
    variant: 'standard',
  },
};

// Custom title
export const CustomTitle = {
  args: {
    authenticationType: 'token',
    title: 'Acesso ao Sistema',
    disabled: false,
    variant: 'outlined',
  },
};
