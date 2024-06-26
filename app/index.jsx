import { View, Text, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import * as LocalAuthentication from 'expo-local-authentication'
import Fontisto from '@expo/vector-icons/Fontisto'
import { useAuth } from '../context/authContext'

const Home = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    handleBiometricAuth()
  }, [])
  const handleBiometricAuth = async () => {
    const isSupported = await LocalAuthentication.hasHardwareAsync()
    if (!isSupported) {
      console.log('Biometric sauthentication is not supported on this device.')
      return
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync()
    if (!isEnrolled) {
      console.log('User has not enrolled in biometric authentication.')
      return
    }

    const authResult = await LocalAuthentication.authenticateAsync()
    if (authResult.success) {
      if (isAuthenticated) {
        router.push('/home')
      } else {
        router.push('/signIn')
      }
      console.log('User authenticated successfully!')
      // You can now grant access to your app or perform any other action
    } else {
      console.log('Authentication failed.')
    }
  }
  return (
    <View className="flex-1  pt-28 items-center bg-indigo-950">
      {/* <ActivityIndicator size={'large'} color={'gray'} /> */}
      <View className="flex flex-col items-center h-96 justify-between ">
        <View className="flex flex-col space-y-2 items-center">
          <Fontisto name="locked" size={34} color="#818cf8" />
          <Text className="text-3xl text-white">ChatsApp Locked</Text>
        </View>
        <Pressable onPress={handleBiometricAuth}>
          <Text className="text-xl text-indigo-400">unlock</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Home
