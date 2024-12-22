import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { AuthState, LoginCredentials, SignupCredentials, User } from '../types/auth';
import { useToast } from '../hooks/useToast';

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SIGNUP_SUCCESS'; payload: User };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  signup: (credentials: SignupCredentials) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { showToast } = useToast();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      // Simulate API call
      const user: User = {
        id: '1',
        email: credentials.email,
        name: credentials.email.split('@')[0],
      };
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      showToast('Successfully logged in!', 'success');
    } catch (error) {
      showToast('Login failed. Please try again.', 'error');
      throw error;
    }
  }, [showToast]);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    try {
      // Simulate API call
      const user: User = {
        id: '1',
        email: credentials.email,
        name: credentials.name,
      };
      dispatch({ type: 'SIGNUP_SUCCESS', payload: user });
      showToast('Account created successfully!', 'success');
    } catch (error) {
      showToast('Signup failed. Please try again.', 'error');
      throw error;
    }
  }, [showToast]);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    showToast('Successfully logged out!', 'success');
  }, [showToast]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};