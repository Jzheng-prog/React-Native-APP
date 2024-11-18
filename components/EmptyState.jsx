import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '../constants/images'
import CustomButton from './CustomButton'
import { router } from 'expo-router'
const EmptyState = ({title, subtitle,bookmark}) => {
  return (
    <View className='justify-center items-center px-4'>
        <Image source={images.empty} resizeMode='contain' className='w-[270px] h-[215px]'/>
        <Text className='font-psemibold text-xl text-white'>{title}</Text>

        <Text className='font-pmedium text-sm text-gray-100'>{subtitle}</Text>

        {bookmark?  <></>
          :
          <CustomButton
          text='Create video'
          containerStyle='w-full my-5'
          handlePress={()=>router.push('/create')}
          />
        }
        
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({})