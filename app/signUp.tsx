import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Octicons from '@expo/vector-icons/Octicons'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useAuth } from '../context/authContext'
import KeyboardCustomView from '@/components/KeyboardCustomView'
const SignUp = () => {
  const router = useRouter()
  const { register } = useAuth()
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const usernameRef = useRef('')
  const [loading, setLoading] = useState(false)
  const [inputData, setInputData] = useState(false)

  const handelSubmit = async () => {
    setLoading(true)
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert(' fill all details')
      setLoading(false)
      return
    }
    const response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current
    )
    if (!response.success) {
      Alert.alert('SignUp', response.msg)
      setLoading(false)
      return
    }

    setLoading(false)
  }
  return (
    <KeyboardCustomView>
      <View className="flex-1 mt-14 px-5">
        <StatusBar style="dark" />

        <View className="flex-1  gap-4">
          <View className="items-center">
            <Image
              source={require('@/assets/images/register.png')}
              resizeMode="contain"
              className="h-72 border"
            />
          </View>

          <Text className="text-3xl text-center font-semibold">SignUp</Text>
          <View className="space-y-4">
            <View className="bg-neutral-100 rounded-xl h-14   flex-row items-center  px-4 ">
              <Feather name="user" size={24} color="gray" />
              <TextInput
                onChangeText={(value) => (usernameRef.current = value)}
                placeholder="Username"
                placeholderTextColor={'gray'}
                className=" flex-1 ml-4 font-semibold text-neutral-700 "
              />
            </View>
            <View className="bg-neutral-100 rounded-xl h-14   flex-row items-center  px-4 ">
              <Octicons name="mail" size={24} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                placeholder="Email"
                placeholderTextColor={'gray'}
                className=" flex-1 ml-4 font-semibold text-neutral-700 "
              />
            </View>

            <View className="space-y-3">
              <View className="bg-neutral-100 rounded-xl h-14 px-4  flex-row items-center">
                <Octicons name="key" size={20} color="gray" />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  placeholder="Password"
                  placeholderTextColor={'gray'}
                  secureTextEntry
                  className=" flex-1 ml-4 font-semibold text-neutral-700 "
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handelSubmit}
            className={`bg-indigo-500  h-16 rounded-xl text-center justify-center items-center `}
          >
            <Text className={`font-semibold text-xl text-white `}>
              {' '}
              {loading ? 'Loading...' : ' Submit'}
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-neutral-500 font-semibold text-center">
              Already have an account?
            </Text>
            <Pressable onPress={() => router.push('signIn')}>
              <Text className="text-indigo-500 font-semibold text-center ml-2">
                SignIn
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardCustomView>
  )
}

export default SignUp
