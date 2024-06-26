import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Slot } from "expo-router"
import { AuthContextProvider, useAuth } from '../context/authContext'
import { useRouter, useSegments } from "expo-router"
const MainLayout = () => {
    const { isAuthenticated } = useAuth()
    const segments = useSegments()
    const router = useRouter()
    useEffect(() => {
        if (typeof isAuthenticated === "undefined") return
        const inApp = segments[0] = "(app)"

        if (isAuthenticated) {

            router.replace("home")
        } else if (isAuthenticated === false) {
            router.replace("signIn")
        }

    }, [isAuthenticated])

    return (
        <View className="flex-1">
            <Slot />
        </View>)
}


const RootLayout = () => {
    return (
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    )
}

export default RootLayout