import { Image, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'
import { TouchableOpacity } from 'react-native'

const SearchInput = ({value, handleChangeText, ...props}) => {

  return (

    <View className='border border-white w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
        <TextInput 
            className=' text-white text-base mt-0.5 flex-1 font-pregular'
            value={value}
            placeholder='Search for a video Topic'
            onChangeText={handleChangeText}
            placeholderTextColor='#7b7b8b'
        />
        <TouchableOpacity>
            <Image source={icons.search} className='w-5 h-5' resizeMode='contain'/>
        </TouchableOpacity>
    </View>
  )
}

export default SearchInput

