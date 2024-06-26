import { View, Text } from 'react-native'
import React from 'react'
import { convertSecondsToTime } from '@/constants/utils'

const MessageItem = ({ item, currentUser }) => {
  //   console.log('🚀 ~ MessageItem ~ item:', item)
  const renderTime = () => {
    const date = convertSecondsToTime(item?.createdAt?.seconds)
    console.log('🚀 ~ renderTime ~ date:', date)
    return date
  }
  if (item?.userId === currentUser?.uid) {
    return (
      <View className="flex-row justify-end mb-1   ">
        <View className="flex flex-row max-w-[80%] w-fit whitespace-break-spaces bg-white rounded-xl s">
          <View className="  px-4 py-2">
            <Text className="text-lg">{item?.text}</Text>
          </View>
          <View className="p-1  justify-end">
            <Text className="text-[10px] text-neutral-400">{renderTime()}</Text>
          </View>
        </View>
      </View>
    )
  } else {
    return (
      <View className="flex-row justify-start mb-1">
        <View className="max-w-[80%] w-fit whitespace-break-spaces bg-indigo-100 rounded-xl px-4 py-2 ">
          <Text className="text-lg">{item?.text}</Text>
          {/* <Text className="text-lg">{item?.userID}</Text> */}
        </View>
      </View>
    )
  }
}

export default MessageItem
