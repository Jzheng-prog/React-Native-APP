import { StyleSheet, Text, View, ScrollView,Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const SignIn = () => {
  const [form, setForm] = useState({
    email:'',
    password:''
  })

  const [submitting, setIsSubmitting] = useState(false)
  const {setUser, setIsLoggedIn} = useGlobalContext()

  const submit = async () =>{

    // console.log(form)
    if(!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the field!')
    }
    setIsSubmitting(true)
    
    try{
      await signIn(form.email,form.password);
      const result = await getCurrentUser();
      setUser(result)
      setIsLoggedIn(true)

      router.replace('/home')
    }catch(error){
      Alert.alert('Error', error.message)
    
    }finally{
      setIsSubmitting(false)
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[75vh] px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'/>
          <Text className='text-white text-semibold text-2xl mt-10 font-psemibold'>Log in to Aora</Text>
          <FormField
          title='Email'
          value={form.email}
          handleChangeText={
            (e)=>setForm({...form, email: e})
          }
          keyboardType='email-address'
          otherStyles='mt-7'
          />
          <FormField
          title='Password'
          value={form.password}
          handleChangeText={
            (e)=>setForm({...form, password: e})
          }
          otherStyles='mt-7'
          />
          <CustomButton 
            handlePress={submit}
            text='Log in'
            containerStyle='mt-7'
            isLoading={submitting}
          />
          <View className='flex-row items-center justify-center pt-5 gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Dont Have an Account?
            </Text>
            <Link href='/sign-up' className='text-lg text-secondary font-psemibold'>Sign Up</Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})