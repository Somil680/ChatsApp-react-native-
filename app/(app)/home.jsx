import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  requireNativeComponent,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import { getDocs, query, where } from 'firebase/firestore'
import { userRef } from '@/firebaseConfig'
import ChatList from '@/components/ChatList'

const Home = () => {
  const { user } = useAuth()

  const [users, setUser] = useState([])
  useEffect(() => {
    if (user?.uid) {
      getUsers()
    }
  }, [])
  const getUsers = async () => {
    try {
      const q = query(userRef, where('userId', '!=', user?.uid))
      const querySnapshot = await getDocs(q)
      let data = []
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() })
      })
      setUser(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  return (
    <View className="flex-1">
      <ChatList user={users} />
    </View>
  )
}

export default Home
