import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const UserContext = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const registerWithEmailPass = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginWithEmailPass = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const profileUpdate = (name, photoURL) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
        })
    }
    const emailVerification = () => {
        setLoading(true)
        return sendEmailVerification(auth.currentUser)
    }
    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }
    const passwordReset = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }
    const userDelete = () => {
        setLoading(true)
        return deleteUser(auth.currentUser)
    }
    const refreshUser = async () => {
        setLoading(true);
        try {
            await auth.currentUser.reload();
            const refreshedUser = auth.currentUser;
            setUser(refreshedUser);
        } catch (error) {
            console.error('Error refreshing user:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])
    const userInfo = {
        user,
        setLoading,
        loading,
        registerWithEmailPass,
        loginWithEmailPass,
        profileUpdate,
        emailVerification,
        logout,
        passwordReset,
        refreshUser,
        userDelete

    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;