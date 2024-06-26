import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useAuth } from '../context/authContext'
const HomeHeader = () => {
  const { logout, user } = useAuth()
  const handlesubmit = async () => {
    await logout()
  }
  return (
    <View className=" bg-indigo-400 pt-10 pb-3 h-28 flex-row justify-between items-end px-5 rounded-b-2xl">
      <Text className="text-3xl text-white font-semibold">ChatsApp</Text>
      <Pressable onPress={handlesubmit}>
        <MaterialIcons name="logout" size={24} color="white" />
      </Pressable>
    </View>
  )
}

export default HomeHeader
