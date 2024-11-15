import { Alert, Image, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'
import { TouchableOpacity } from 'react-native'
import { router, usePathname } from 'expo-router'

const SearchInput = ({initialQuery}) => {

  const pathname = usePathname()
  const [query,setQuery] = useState(initialQuery||'')
  return (

    <View className='border border-white w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
        <TextInput 
            className=' text-white text-base mt-0.5 flex-1 font-pregular'
            value={query}
            placeholder='Search for a video Topic'
            onChangeText={(e)=>setQuery(e)}
            placeholderTextColor='#CDCDE0'
        />
        <TouchableOpacity onPress={()=>{
          if(!query){
            return Alert.alert('Error', 'Please input something to search for results.')
          }
          if(pathname.startsWith('/search')){
            router.setParams({query})
          }else{
            router.push(`/search/${query}`)
          }
        }}>
            <Image source={icons.search} className='w-5 h-5' resizeMode='contain'/>
        </TouchableOpacity>
    </View>
  )
}

export default SearchInput

