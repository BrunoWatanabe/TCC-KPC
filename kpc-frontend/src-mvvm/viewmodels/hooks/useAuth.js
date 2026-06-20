// @model: specs/001-login-component/model/login-classes.puml
// RF: RF-001, RF-002, RF-003, RF-004, RF-007, RF-008

/**
 * useAuth — Hook personalizado que conecta LoginView ao useAuthStore.
 * Nomenclatura alinhada ao modelo login-classes.puml (UseAuthHook).
 */
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.js';

export const useAuth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { login, clearError, loading, error, isAuthenticated } = useAuthStore();

  // RF-007 — Redirecionar para /topics quando autenticar
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/topics');
    }
  }, [isAuthenticated, navigate]);

  const handleUsernameChange = useCallback((value) => {
    setUsername(value);
    if (error) clearError();
  }, [error, clearError]);

  const handlePasswordChange = useCallback((value) => {
    setPassword(value);
    if (error) clearError();
  }, [error, clearError]);

  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();

    // RF-002 — Validação client-side
    if (!username.trim()) {
      return;
    }
    if (!password.trim()) {
      return;
    }

    // RF-005 — Store chama AuthService
    await login(username, password);
  }, [username, password, login]);

  const viewState = {
    username,
    password,
    loading,
    error,
    onUsernameChange: handleUsernameChange,
    onPasswordChange: handlePasswordChange,
    onSubmit: handleSubmit,
  };

  return viewState;
};