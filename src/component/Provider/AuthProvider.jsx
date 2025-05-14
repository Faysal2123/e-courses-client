import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut,  onAuthStateChanged, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from './firebase.init';

export const AuthContext=createContext()
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
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
             setUser(currentUser)
             setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    })
  
    const updateUserProfile=(name,photo)=>{
        
        return updateProfile(auth.currentUser,{
           displayName:name,
           photoURL:photo,
        })
       
    }
    const authInfo={
        user,
        setUser,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;