import { View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import ChatItem from '@/components/ChatItem'
import { useRouter } from 'expo-router'
const ChatList = ({ user }) => {
  const router = useRouter()

  return (
    <View className="flex-1">
      <FlatList
        data={user}
        className="mb-20 px-3"
        keyExtractor={(item) => item.userId.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <ChatItem
              item={item}
              router={router}
              onBorder={index + 1 == user.length}
            />
          )
        }}
      />
    </View>
  )
}

export default ChatList
