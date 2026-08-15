import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/adminMockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Default logged in user: Ayesha Khan
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('vids_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_USERS[0]; // Ayesha Khan
  });

  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem('vids_users_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_USERS;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('vids_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('vids_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('vids_users_list', JSON.stringify(usersList));
  }, [usersList]);

  // Login handler
  const login = (emailOrUsername, password) => {
    if (!emailOrUsername || !password) {
      return { success: false, error: 'Login or Password is required.' };
    }

    const trimmed = emailOrUsername.trim().toLowerCase();
    const user = usersList.find(
      u => u.email.toLowerCase() === trimmed || u.name.toLowerCase() === trimmed
    );

    if (!user) {
      return { success: false, error: 'Login or Password is incorrect.' };
    }

    if (user.status === 'Inactive' || user.status === 'Disabled') {
      return { success: false, error: 'Account is deactivated. Please contact an administrator.' };
    }

    // Passwords accepted for demo or check
    if (password.length < 3) {
      return { success: false, error: 'Login or Password is incorrect.' };
    }

    setCurrentUser(user);
    return { success: true, user };
  };

  // Register handler matching U_REG test criteria
  const register = ({ name, email, password, confirmPassword, phone, role = 'Customer / Homeowner' }) => {
    if (!name || !email || !password || !confirmPassword) {
      return { success: false, error: 'All fields are required.' };
    }

    if (password !== confirmPassword) {
      return { success: false, error: "Password and Confirm Password fields don't match." };
    }

    const emailExists = usersList.some(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (emailExists) {
      return { success: false, error: 'This email is already registered. Please choose a different username/email.' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone || '+92 300 0000000',
      role,
      status: 'Active',
      designsCount: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    const updatedList = [...usersList, newUser];
    setUsersList(updatedList);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setUsersList(prev => prev.map(u => u.id === currentUser.id ? updated : u));
    return { success: true, user: updated };
  };

  // Admin user management functions
  const adminCreateUser = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+92 300 0000000',
      role: userData.role || 'Customer / Homeowner',
      status: userData.status || 'Active',
      designsCount: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUsersList(prev => [...prev, newUser]);
    return newUser;
  };

  const adminUpdateUser = (id, fields) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, ...fields } : u));
    if (currentUser?.id === id) {
      setCurrentUser(prev => ({ ...prev, ...fields }));
    }
  };

  const adminDeleteUser = (id) => {
    setUsersList(prev => prev.filter(u => u.id !== id));
    if (currentUser?.id === id) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      usersList,
      login,
      register,
      logout,
      updateProfile,
      adminCreateUser,
      adminUpdateUser,
      adminDeleteUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
