import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getRoomId, secondsToDate } from '@/constants/utils'
import { useAuth } from '@/context/authContext'

import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebaseConfig'
const ChatItem = ({ item, router, onBorder }) => {
  const { user } = useAuth()
  const [lastMessage, setLastMessage] = useState({})
  console.log('🚀 ~ ChatItem ~ lastMessage:', lastMessage[0])

  useEffect(() => {
    let roomId = getRoomId(user?.uid, item?.userId)
    const docRef = doc(db, 'rooms', roomId)
    const messageRef = collection(docRef, 'messages')
    const q = query(messageRef, orderBy('createdAt', 'asc'))

    let unSub = onSnapshot(q, (snapshot) => {
      let allMessage = snapshot.docs.map((doc) => {
        return doc.data()
      })
      allMessage = allMessage.slice().reverse()
      setLastMessage([allMessage[0] ? allMessage[0] : null])
    })
    return unSub
  }, [])

  const openChatRoom = () => {
    router.push({ pathname: '/chatRoom', params: item })
  }
  const renderLastMessage = () => {
    if (typeof lastMessage === '') return 'Loading...'
    if (lastMessage[0] != null) {
      if (user.uid === lastMessage[0]?.userId) {
        return `You- ` + lastMessage[0]?.text
      } else {
        return lastMessage[0]?.text
      }
    } else {
      return 'Say hi '
    }
  }
  const renderTime = () => {
    let date = ''
    if (lastMessage[0] === null) {
      return date
    } else {
      return (date = secondsToDate(lastMessage[0]?.createdAt?.seconds))
    }
    return date
  }

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={openChatRoom}
        className={`h-20  flex-row items-center ${
          onBorder ? ' ' : 'border-b border-neutral-300'
        }  `}
      >
        <Image
          source={require('@/assets/images/avatar.png')}
          alt=""
          className="w-12 h-12 rounded-full mr-4"
        />
        <View className="flex-1 ">
          <View className="flex-row justify-between items-center">
            <Text className="  text-neutral-700 font-bold text-xl">
              {item.username}
            </Text>
            <Text className="  text-neutral-500 text-sm">{renderTime()}</Text>
          </View>
          <Text className="  text-neutral-500 text-sm">
            {' '}
            {renderLastMessage()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ChatItem
