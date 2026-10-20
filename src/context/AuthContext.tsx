import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import {
  registerWithEmail,
  loginWithEmail,
  resetPassword,
  logout,
  getCurrentSession
} from '../firebase/auth';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  authPromptMessage: string | null;
  setAuthPromptMessage: (message: string | null) => void;
  clearError: () => void;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authPromptMessage, setAuthPromptMessage] = useState<string | null>(null);

  // Validate active session on mount against the authoritative server
  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const sessionUser = await getCurrentSession();
        if (isMounted) {
          setUser(sessionUser);
        }
      } catch (err) {
        console.warn('Session check warning:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    checkSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const clearError = () => setError(null);

  // Client registration - strictly creates a regular 'cliente' account
  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const profile = await registerWithEmail(name, email, password);
      setUser(profile);
      setAuthPromptMessage(null);
    } catch (err: any) {
      const msg = err.message || 'Falha ao criar conta. Verifique os dados informados.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Unified login for both clients and the single administrator
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const profile = await loginWithEmail(email, password);
      setUser(profile);
      setAuthPromptMessage(null);
    } catch (err: any) {
      // Strictly generic error message
      const msg = err.message || 'E-mail ou senha incorretos.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Terminate session on server and clear state
  const signOutUser = async () => {
    setIsLoading(true);
    try {
      await logout();
      setUser(null);
      setAuthPromptMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const requestPasswordReset = async (email: string) => {
    setError(null);
    try {
      return await resetPassword(email);
    } catch (err: any) {
      const msg = err.message || 'Erro ao redefinir senha.';
      setError(msg);
      throw err;
    }
  };

  const role: UserRole = user?.role === 'administrador' ? 'administrador' : 'cliente';
  const isAdmin = user !== null && user.role === 'administrador';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAdmin,
        isLoading,
        error,
        authPromptMessage,
        setAuthPromptMessage,
        clearError,
        signUp,
        signIn,
        signOutUser,
        requestPasswordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
