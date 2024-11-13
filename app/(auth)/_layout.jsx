import React from 'react'
import { Stack } from 'expo-router'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'

const Authlayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name='sign-in' options={{headerShown:false}}/>
        <Stack.Screen name='sign-out' options={{headerShown:true}}/>
      </Stack>
      <ExpoStatusBar backgroundColor='#161622' style='dark'/>
    </>
  )
}

export default Authlayout