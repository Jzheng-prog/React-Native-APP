import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CustomButton = ({text, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
        className={`${containerStyles}bg-secondary rounded-xl min-h-[62px] justify-center items-center ${isLoading?'opacity-50':''}`}
        disabled={isLoading}
        onPress={handlePress}activeOpacity={0.7}
    >
        <Text className={`text-primary font-psemibold text-lg${textStyles}`}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({})