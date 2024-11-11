import {Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'react-native-web'

export default function App(){
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-3xl font-pblack'>Lofi</Text>
      <StatusBar style='auto'/>
      <Link href='/home' style={{color:'blue'}}>go to Home</Link>
    </View>
  )
}
