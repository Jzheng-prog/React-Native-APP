import {Image, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import {Redirect, router} from 'expo-router'
import {SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../constants'
import CustomButton from '../components/CustomButton'
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../context/GlobalProvider'

export default function App(){

  const {isLoading, isLoggedIn} = useGlobalContext()

//   if (isLoading) {
//     return <Text>Loading...</Text>; // or a loading spinner
//  }


  if(!isLoading && isLoggedIn){

    return (<Redirect href='/home'/>)
  }
  // useEffect(()=>{
  //   console.log({isLoading,isLoggedIn})
  // },[isLoading, isLoggedIn])
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className='w-full justify-center items-center h-full px-4'>
          <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain'/> 
          <Image source={images.cards} className='w-full h-[300px] max-w-[380px]' resizeMode='contain'/> 

          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless Possibilities with{' '}
              <Text className='text-secondary-200'>Aora</Text>
            </Text>
            <Image source={images.path} className=' w-[136px] h-[15px] absolute -bottom-2 right-24' resizeMode='contain'/>
          </View>
          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>
          <CustomButton 
            text='Continue with Email'
            handlePress={()=> router.push('/sign-in')}
            containerStyle='w-full mt-7'
            />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}
