import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import React, { createContext, useState, useEffect, useContext } from "react"
import { auth, db } from "../firebaseConfig"
import { addDoc, doc, setDoc } from "firebase/firestore"
export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true)
                setUser(user)
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unSub
    }, [isAuthenticated])

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            return { success: true, data: response?.user }
        } catch (error) {
            return { success: false, msg: error.message }
        }
    }
    const register = async (email, password, username, profileUrl) => {
        try {

            const response = await createUserWithEmailAndPassword(auth, email, password)
            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                // profileUrl,
                userId: response?.user?.uid
            });
            return { success: true, data: response?.user }
        } catch (error) {
            return { success: false, msg: error.message }
        }

    }
    const logout = async () => {
        try {
            await signOut(auth)
            return { success: true }
        } catch (error) {
            return { success: true, message: error.message, error: error }
        }

    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>)
}

export const useAuth = () => {
    const value = useContext(AuthContext)

    if (!value) {
        throw new Error("useAuth must be used wrap an AuthContextProvider")
    }
    return value
}