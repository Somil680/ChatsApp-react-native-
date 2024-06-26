import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
const android = Platform.OS === 'android'
const KeyboardCustomView = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={android ? 'height' : 'padding'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default KeyboardCustomView
