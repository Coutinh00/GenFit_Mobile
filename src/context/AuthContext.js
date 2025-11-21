import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserRole, setUserRole, getCurrentUser, setCurrentUser } from '../services/storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRoleState] = useState(null);
  const [currentUser, setCurrentUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sempre inicia sem sessão salva - força login na inicialização
    setLoading(false);
  }, []);

  const login = async (role, userData = null) => {
    try {
      await setUserRole(role);
      setUserRoleState(role);
      
      if (userData) {
        await setCurrentUser(userData);
        setCurrentUserState(userData);
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log('AuthContext - Iniciando logout...');
      
      // Limpar estado primeiro para atualização imediata
      setUserRoleState(null);
      setCurrentUserState(null);
      
      console.log('AuthContext - Estado limpo, limpando AsyncStorage...');
      
      // Depois limpar dados do AsyncStorage
      await setUserRole(null);
      await setCurrentUser(null);
      
      console.log('AuthContext - Logout realizado com sucesso - userRole:', null);
      return true;
    } catch (error) {
      console.error('AuthContext - Erro ao fazer logout:', error);
      // Mesmo com erro, limpar o estado
      setUserRoleState(null);
      setCurrentUserState(null);
      return false;
    }
  };

  const updateUser = async (userData) => {
    try {
      await setCurrentUser(userData);
      setCurrentUserState(userData);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        currentUser,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

