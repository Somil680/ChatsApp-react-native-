import { View, Text, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useAuth } from '../context/authContext'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from 'expo-router'
import Zocial from '@expo/vector-icons/Zocial'
import Ionicons from '@expo/vector-icons/Ionicons'

const HomeHeader = ({ item }) => {
  const { logout, user } = useAuth()
  const router = useRouter()
  const handleBackPage = () => {
    router.back()
  }
  return (
    <View className=" bg-indigo-400 pt-10 pb-3 h-24  flex-row justify-between items-end px-5 r">
      <View className="flex flex-row items-center gap-3">
        <AntDesign
          onPress={handleBackPage}
          name="arrowleft"
          size={24}
          color="white"
        />
        <Text className="text-2xl text-white font-semibold">
          {item.username}
        </Text>
      </View>
      <View className=" flex flex-row gap-3 items-center">
        <View className=" bo flex flex-row  space-x-3 items-center">
          <Zocial name="call" size={24} color="white" />
          <Ionicons name="videocam" size={24} color="white" />
        </View>
        <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
      </View>
    </View>
  )
}

export default HomeHeader
