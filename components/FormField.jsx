import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'
import { TouchableOpacity } from 'react-native'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {

  const [showPw, setShowPw] = useState(false)
  return (
    <View className={`space-y-3 ${otherStyles}`}>
      <Text className='text-gray-100 text-base font-medium mb-2'>{title}</Text>

      <View className='border border-white w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row'>
        <TextInput 
          className=' text-white font-psemibold text-base flex-1'
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor='#7b7b8b'
          secureTextEntry ={title==='Password' && !showPw}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={()=>setShowPw(!showPw)}>
            <Image source={!showPw? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain'/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({})