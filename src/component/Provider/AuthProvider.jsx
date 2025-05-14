import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from './firebase.init';

const AuthContext=createContext()
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const provider=new GoogleAuthProvider();
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn=(email,password)=>{
        setLoading()
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signInWithGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,provider)
    }
    const logOut=()=>{
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged(auth,(currentUser)=>{
             setUser(currentUser)
             setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    })
    const authInfo={
        user,
        loading,
        createUser,
        signIn,
        logOut,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;