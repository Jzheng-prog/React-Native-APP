import { StyleSheet, Text, View,SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { VideoView } from 'expo-video'
import { icons } from '../../constants'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'

import { router } from 'expo-router'
import {createVideo} from '../../lib/appwrite'
import {useGlobalContext} from '../../context/GlobalProvider'

const Create = () => {
  const [form, setForm] = useState({
    title:'',
    video:null,
    thumbnail:null,
    prompt:'',
    userId:''
  })
  const [clickedSubmit, setClickedSubmit] = useState(false)
  const {user} = useGlobalContext()

  const [uploading, setUploading] = useState(false)

  const openPicker = async (selectedType)=>{

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectedType === 'image' 
        ? ['images'] 
        : ['videos'],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });



    // const result = await DocumentPicker.getDocumentAsync({
    //   type: selectedType === 'image' ?
    //     ['image/png', 'image/jpg', 'image/jpeg']:
    //     ['video/mp4', 'video/gif']
    // })

    if(!result.canceled){
      if(selectedType ==='image'){
        setForm({...form, thumbnail:result.assets[0]})
      }if(selectedType ==='video'){
        setForm({...form, video:result.assets[0]})
      }
    }
    
    // else{
    //   setTimeout(()=>{
    //     Alert.alert('Document picked', JSON.stringify(result, null, 2))
    //   },100)
    // }
  }
  
  const submit = async ()=>{
    setClickedSubmit(!clickedSubmit)
    // console.log("User context before submission:", user.$id);
    if (!user || !user.$id) {
      return Alert.alert('Error', 'User information is missing. Please log in again.');
    }
    if(!form.prompt || !form.video || !form.title || !form.thumbnail){
      return Alert.alert('Please fill in all the fields.')
    }

    // console.log("userId:", user.$id)

    setUploading(true)

    try{

      await createVideo({...form, userId: user.$id})
      Alert.alert('Sucess', 'Post uploaded successfully!')
      router.push('/home')
    }catch(error){
      Alert.alert("Error in submit", error.message || "Something went wrong while submitting.");
    }finally{
      setUploading(false)
      setForm({
        title:'',
        video:null,
        thumbnail:null,
        prompt:''
      })
    }
  }

  // useEffect(()=>{
  //     // console.log("Clicked", clickedSubmit)
  //     console.log("User in useEffect:", user.$id)
  // },[clickedSubmit])
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='border border-white px-4 my-6'>
        <Text className='text-white text-2xl font-psemibold'>
          Upload Video
        </Text>
        <FormField placeholder='Video Title' value={form.title} handleChangeText={(e)=>setForm({...form, title:e})} otherStyles='mt-10'/>

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>Upload Video</Text>

          <TouchableOpacity onPress={()=> openPicker('video')}>

            {
              form.video? (
                <View style={styles.contentContainer}>
                  <VideoView style={styles.video} nativeControls resizeMode='cover' />
                </View> 
              ):(
                <View className='w-full h-40 px-4 border-black-200 border-2 rounded-2xl justify-center items-center bg-black-100'>
                  <View className='w-14 h-14 border-secondary-100 border-dashed border items-center justify-center'>
                    <Image source={icons.upload} className='w-1/2 h-1/2' resizeMode='contain'/>
                  </View>
                </View>
              )
            }

          </TouchableOpacity>
        </View>

        <View className='my-2'>
          <Text className='text-base text-gray-100 font-pmedium mt-2'>Thumbnail Image</Text>
          <TouchableOpacity onPress={()=> openPicker('image')}>

            {
              form.thumbnail? (
                <Image source={{uri:form.thumbnail.uri}} resizeMode='cover' className='w-full h-64 rounded-2l border border-red-300'/>
              ):(
                <View className='w-full h-16 px-4 border-black-200 border-2 rounded-2xl justify-center items-center bg-black-100 flex-row space-x-2'>
                    <Image source={icons.upload} className='w-5 h-5' resizeMode='contain'/>
                    <Text className='text-sm text-gray-100 font-pmedium px-2'>Choose A file</Text>
                </View>
              )
            }

          </TouchableOpacity>
        </View>

        <FormField title='Ai Prompt' placeholder='The prompt you used to create this video' value={form.prompt} handleChangeText={(e)=>setForm({...form, prompt:e})} otherStyles='mt-7'/>
        <CustomButton text='Submit and Publish' containerStyle='mt-7' isLoading={uploading} handlePress={submit}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 208,  // equivalent to w-52
    height: 288, // equivalent to h-72
    borderRadius: 33,  // equivalent to rounded-[33px]
    marginTop: 12,  // equivalent to mt-3
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // equivalent to bg-white/10
  },
  controlsContainer: {
    padding: 10,
  },
});