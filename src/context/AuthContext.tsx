import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../lib/firebase';

const defaultUser: any = {
  email: 'test'
}

const UserContext = createContext({
  createUser: (email: any, password: any) => { },
  user: {},
  logout: () => { },
  signIn: (email: any, password: any) => { },
  getUser: () => { return defaultUser  }
});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState({});

  const createUser = (email: any, password: any) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: any, password: any) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const getUser = () => {
      return user;
  }

  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser!);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const Auth = () => {
  return useContext(UserContext);
};
