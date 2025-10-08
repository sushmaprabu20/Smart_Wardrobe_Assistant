import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthContextType, Credentials } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'ai-wardrobe-users';
const CURRENT_USER_SESSION_KEY = 'ai-wardrobe-currentUser';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const storedUser = sessionStorage.getItem(CURRENT_USER_SESSION_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Failed to parse current user from sessionStorage', error);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  
  const getUsers = (): User[] => {
    try {
      const users = localStorage.getItem(USERS_STORAGE_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Failed to parse users from localStorage', error);
      return [];
    }
  };

  const saveUsers = (users: User[]) => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save users to localStorage', error);
    }
  };

  const signup = async ({ email, password }: Credentials): Promise<void> => {
    return new Promise((resolve, reject) => {
        const users = getUsers();
        const userExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
    
        if (userExists) {
            return reject(new Error("An account with this email already exists."));
        }
        
        // In a real app, you would hash the password here.
        const newUser: User = { email, password };
        const updatedUsers = [...users, newUser];
        saveUsers(updatedUsers);
    
        setCurrentUser({ email });
        try {
            sessionStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify({ email }));
        } catch(e) {
            console.error(e)
        }
        resolve();
    });
  };

  const login = async ({ email, password }: Credentials): Promise<void> => {
     return new Promise((resolve, reject) => {
        const users = getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user || user.password !== password) {
            return reject(new Error("Invalid email or password."));
        }

        setCurrentUser({ email });
        try {
            sessionStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify({ email }));
        } catch(e) {
            console.error(e);
        }
        resolve();
    });
  };

  const logout = () => {
    setCurrentUser(null);
    try {
        sessionStorage.removeItem(CURRENT_USER_SESSION_KEY);
    } catch(e) {
        console.error(e);
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
