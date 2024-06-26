import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from '../components/MessageItem'
const MessageList = ({ message, currentUser, scrollViewRef }) => {
  return (
    <ScrollView ref={scrollViewRef} className="flex-1  p-3">
      {message.map((item, index) => {
        return <MessageItem item={item} currentUser={currentUser} key={index} />
      })}
    </ScrollView>
  )
}

export default MessageList
// <MessageItem message={item} currentUser={currentUser} key={index} />
