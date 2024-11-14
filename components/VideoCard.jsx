import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { icons } from '../constants'
import { TouchableOpacity } from 'react-native'

const VideoCard = ({video:{title, thumbnail, creator:{avatar, username}}}) => {

    const [play, setPlay] = useState(false) 
  return (
    <View className='flex flex-col items-center px-4 mb-14'>
        <View className='flex flex-row gap-3 items-start justify-center py-3 border border-blue-500'>

            <View className='flex justify-center items-center flex-row flex-1 border border-blue-500'>
                <View className='w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center'>
                    <Image source={{uri:avatar}} className="w-full h-full rounded-lg" resizeMode="cover"/>
                </View>
                <View className='justify-center flex-1 ml-3 gap-y-1'>
                    <Text className='text-xs font-psemibold text-white' numberOfLines={1}>{title}</Text>
                    <Text className='text-xs font-pregular text-gray-100' numberOfLines={1}>{username}</Text>
                </View>
            </View>

            <View className=' py-4 flex items-center justify-center border border-red-500'>
                <Image source={icons.menu} resizeMode='contain' className='w-5 h-5'/>
            </View>
        </View>
        {play ? (
            <Text className='text-white my-3'>Playing</Text>
        ):(
            <TouchableOpacity className='w-full h-60 rounded-xl mt-3 relative justify-center items-center flex border border-green-400' activeOpacity={0.7} onPress={()=>setPlay(true)}>
                <Image source={{uri:thumbnail}} className='w-full h-full rounded-xl mt-3' resizeMode='cover'/>
                <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain'/>
            </TouchableOpacity>
        )}
    </View>
  )
}

export default VideoCard

const styles = StyleSheet.create({})