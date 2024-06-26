import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
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
import { db } from '../../firebaseConfig'
import { useLocalSearchParams } from 'expo-router'
import MessageList from '../../components/MessageList'
import ChatHeader from '../../components/ChatHeader'
import { getRoomId } from '@/constants/utils'

const chatRoom = () => {
  const scrollViewRef = useRef(null)
  const { user } = useAuth()
  const item = useLocalSearchParams()
  console.log('🚀 ~ chatRoom ~ item:', item)
  const [messages, setMessages] = React.useState([])
  useEffect(() => {
    createRoomIfNoExist()
    let roomId = getRoomId(user?.uid, item?.userId)
    const docRef = doc(db, 'rooms', roomId)
    const messageRef = collection(docRef, 'messages')
    const q = query(messageRef, orderBy('createdAt', 'asc'))

    let unSub = onSnapshot(q, (snapshot) => {
      let allMessage = snapshot.docs.map((doc) => {
        return doc.data()
      })
      setMessages([...allMessage])
    })
    return unSub
  }, [])

  const createRoomIfNoExist = async () => {
    let roomId = getRoomId(user?.uid, item?.userId)
    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      // profileUrl,
      createdAt: Timestamp.fromDate(new Date()),
    })
  }
  const textRef = useRef('')
  const handleSendMessage = async () => {
    let roomId = getRoomId(user?.uid, item?.userId)
    let message = textRef.current.trim()
    if (!user || !item.userId) {
      Alert.alert('Error', 'User ID is not available')
      return
    }
    try {
      const docRef = doc(db, 'rooms', roomId)
      const messageRef = collection(docRef, 'messages')
      const newDoc = await addDoc(messageRef, {
        userId: user?.uid,
        text: message,
        senderName: item?.username,
        createdAt: Timestamp.fromDate(new Date()),
      })
    } catch (error) {
      Alert.alert('Message', error.message)
    }
  }
  useEffect(() => {
    updateScrollView()
  }, [messages])
  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true })
    })
  }

  return (
    <View className="flex-1 flex-col justify-between">
      <View>
        <ChatHeader item={item} />
      </View>
      <View className="flex-1">
        <MessageList
          scrollViewRef={scrollViewRef}
          message={messages}
          currentUser={user}
        />
      </View>

      <View className="bg-neutral-100 border-neutral-300 border h-14  flex-row justify-between items-center m-3 p-3 rounded-full ">
        <TextInput
          onChangeText={(value) => (textRef.current = value)}
          placeholder="Type message.."
          className="w-[90%] font-semibold text-lg"
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="indigo" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default chatRoom
