import { StyleSheet, Text, View,FlatList, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import {getUserPost, signOut} from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import {useGlobalContext} from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'
const Profile = () => {

  const {user, setUser,isLoggedIn, setIsLoggedIn} = useGlobalContext()
  const {data:posts, refetch} = useAppwrite(()=>getUserPost(user.$id))

  const logout = async () => {
    try {
      await signOut(); // Log out the user
      setUser(null);
      setIsLoggedIn(false);
      // console.log('User logged out, redirecting to /sign-in');
      router.replace('/sign-in'); // Redirect to sign-in
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        className='border border-white'
        // data={[]}
        data={posts}
        keyExtractor={(item)=>item.$id}
        renderItem={({item})=>(
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            avatar={item.creator?.avatar}
            username={item.creator?.username}
          />
        )}
        ListHeaderComponent={()=>(
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity className='items-end w-full mb-10' onPress={logout}>
              <Image source={icons.logout} className='w-6 h-6]' resizeMode='contain'/>
            </TouchableOpacity>
            <View className='w-16 h-16 border border-secondary justify-center items-center rounded-lg'>
              <Image source={{uri:user?.avatar}} className='w-[90%] h-[90%] rounded-lg' resizeMode='cover'/>
            </View>

            <InfoBox title={user?.username} containerStyle='mt-5' titleStyles='text-lg'/>

            <View className='mt-5 flex-row'>
              <InfoBox title={posts.length || 0} containerStyle='mr-10' titleStyles='text-xl' subTitle='Posts'/>
              <InfoBox title={'1.2k'} titleStyles='text-xl' subTitle='Folowers'/>

            </View>
          </View>
        )}

        ListEmptyComponent={()=>(
          <EmptyState title='No Videos Found' subtitle='No videos found for this search.'/>
        )}
      />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})